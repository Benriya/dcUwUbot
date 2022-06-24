import dotenv from 'dotenv'
dotenv.config();

import http from 'http';
import func from './utility/functions.js';
import Discord from 'discord.js';
import database from './database/handle_database.js';
import {channelIds, listCheck} from "./utility/models.js";
import {loadCommon} from "./commands/commandsCommon.js";
import {loadAdmin} from "./commands/commandsAdmin.js";
import {loadReply} from "./commands/commandsReply.js";
import {loadLoop} from "./commands/commandsLoop.js";

const PORT = process.env.PORT || 4040;
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Default view');
});
server.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

loadLoop(client);

client.on('messageCreate', async msg => {
    if (msg === undefined) return;
    if (msg.author.bot) return;
    msg.channel.messages.fetch({limit: 3}).then(async messages => {
        const lastMessage = messages.first();
        const lastMessages = [...messages.values()];
        const messageChannel = msg.channel.id;
        const firstMention = msg.mentions.members.first();

        if (!lastMessage.author.bot) {
            if (func.checkIfSame(lastMessages)){
                func.toDiscordMessage(client, msg, lastMessage.content);
            }
        }
        for (let expected in listCheck) {
            if (func.isSimilar(lastMessage.content, listCheck[expected]) >= 0.5) {
                database.updateList(listCheck[expected]);
            }
        }

        await loadCommon(client, lastMessage, firstMention);
        await loadAdmin(client, lastMessage, messageChannel);
        await loadReply(client, lastMessage, messageChannel, firstMention);
    }).catch(console.error);
});

client.on('raw', packet => {
    // We don't want this to run on unrelated packets
    if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) return;
    // Grab the channel to check the message from
    const channel = client.channels.cache.get(packet.d.channel_id);
    // There's no need to emit if the message is cached, because the event will fire anyway for that
    if (channel.messages.cache.has(packet.d.message_id)) return;
    // Since we have confirmed the message is not cached, let's fetch it
    channel.messages.fetch(packet.d.message_id).then(message => {
        // Emojis can have identifiers of name:id format, so we have to account for that case as well
        const emoji = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
        // This gives us the reaction we need to emit the event properly, in top of the message object
        const reaction = message.reactions.cache.get(emoji);
        // Adds the currently reacting user to the reaction's users collection.
        if (reaction) reaction.users.cache.set(packet.d.user_id, client.users.cache.get(packet.d.user_id));
        // Check which type of event it is before emitting
        if (packet.t === 'MESSAGE_REACTION_ADD') {
            client.emit('messageReactionAdd', reaction, client.users.cache.get(packet.d.user_id));
        }
        if (packet.t === 'MESSAGE_REACTION_REMOVE') {
            client.emit('messageReactionRemove', reaction, client.users.cache.get(packet.d.user_id));
        }
    });
});

client.on('messageDelete', message => {
    const channel = message.channel;
    let messagePic = '';
    let messageContent = '*none*';
    if (message.cleanContent !== null) {
        if (message.cleanContent.length > 0) {
            messageContent = message.cleanContent;
        }
    } else {
        return;
    }

    const textEmbed = new Discord.MessageEmbed()
        .setColor('#9b18bf')
        .setTitle('Deleted Message')
        .setThumbnail(`${message.author.avatarURL()}`)
        .setAuthor({name: `${message.author.username}`})
        .setDescription(`${channel}`)
        .addField('Message: ', messageContent, true)
        .setTimestamp();

    const attachment = [...message.attachments.values()];

    if (message.author.bot || message.channel.id === '704983142452428933' ||
        message.channel.id === channelIds.deleteChannelId) {}
    else if (message.attachments.size > 0) {
        client.channels.cache.get("745317754256490567").messages.fetch({limit: 5}).then(messages => {
            let lastMessages = [...messages.values()];

            for (let i = 0; i < lastMessages.length; i++) {
                if(lastMessages[i].content.includes(attachment[0].id)) {
                    messagePic = lastMessages[i].content.split(' ');
                    const pictureEmbed = new Discord.MessageEmbed()
                        .setColor('#9b18bf')
                        .setTitle('Deleted Picture')
                        .setThumbnail(`${message.author.avatarURL()}`)
                        .setAuthor({name: `${message.author.username}`})
                        .setImage(messagePic[0])
                        .setDescription(`${channel}`)
                        .addField('Message: ', messageContent, true)
                        .setTimestamp();
                    func.toDiscordMessageChannel(client, channelIds.deleteChannelId, {embeds: [pictureEmbed]});
                }
            }
        }).catch(console.error);
    } else {
        func.toDiscordMessageChannel(client, channelIds.deleteChannelId, {embeds: [textEmbed]});
    }
});

client.on('messageReactionAdd', async (reaction, user) => {
    try{
        if (reaction === undefined) {
            return;
        }
        if (reaction.message.partial) {
            try {
                if (reaction.emoji.name === '📌') {
                    await reaction.message.fetch();
                }
            } catch (error) {
                console.error('Something went wrong when fetching the message: ', error);
            }
        }
    } catch (e) {
     console.error(e);
    }

    if (reaction.emoji.name === '📌'){
        await reaction.message.pin();
        const textEmbedPin = new Discord.MessageEmbed()
            .setColor('#ff0015')
            .setTitle('Pinned Message')
            .setThumbnail(`${user.avatarURL()}`)
            .setAuthor({name: `${user.username}`})
            .addField('Message: ', reaction.message.url, true)
            .setTimestamp();
        func.toDiscordMessageChannel(client, channelIds.deleteChannelId, {embeds: [textEmbedPin]});
    }
});

client.login(process.env.TOKEN);
