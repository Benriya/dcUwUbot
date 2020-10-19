require('heroku-self-ping').default("https://discord8w8bot.herokuapp.com");

const http = require('http');

const PORT = process.env.PORT || 4040;
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World 2');
});
server.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

const PornSearch = require('pornsearch');
const gifSearch = require('gif-search');
const songs = require('./songs');
const func = require('./functions');
const Discord = require('discord.js');
const client = new Discord.Client();
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

let fs = require('fs');
let files;
let chosenFile;
let swearStack = 0;
let voters = [];

client.on('message', msg => {
    if(msg.author.bot) return;

    let attachment = (msg.attachments).array();
    if (msg.attachments.size > 0) {
        client.channels.get("745317754256490567").send(`${attachment[0].proxyURL} id: ${attachment[0].id}`);
    }

    msg.channel.fetchMessages({limit: 3}).then(messages => {
        let lastMessage = messages.first();
        let lastMessages = messages.array();

        if (!lastMessage.author.bot) {
            if (func.checkIfSame(lastMessages)){
                msg.channel.send(lastMessage.content);
            }
        }
    }).catch(console.error);

    if (msg.content === 'ping') {
        msg.reply('Pong!');
    }

    if (msg.content.substring(0, 1) === '!') {
        let args = msg.content.substring(1).split(' ');
        let cmd = args[0];

        let sentence = msg.content.slice(5);
        let nickname = args[1];
        switch (cmd.toLocaleLowerCase()) {
            case 'rule':
                attachment = new Discord.Attachment('./rule.png');
                msg.channel.send(attachment);
                break;
            case 'praise1':
                msg.channel.send(nickname + '<:head:767421798786138154>\n' + '<:hand:767421873360601168>' + '<:face:767421929366749184>');
                break;
            case 'praise2':
                msg.channel.send(nickname + '<:popehead:767494031193407509>\n' + '<:popehand:767494212794843186>' + '<:popeface:767494094616133683>');
                break;
            case 'kezelhetetlen':
                files = fs.readdirSync('./slap');
                chosenFile = files[Math.floor(Math.random() * files.length)];
                attachment = new Discord.Attachment('./slap/' + chosenFile);
                msg.channel.send(attachment);
                break;
            case 'porn':
                const Searcher = new PornSearch(sentence);
                Searcher.gifs()
                    .then(gifs => {
                        msg.channel.send(gifs[Math.floor(Math.random() * gifs.length)].webm)
                    });
                break;
            case '!help':
                msg.author.send('Szoszi \nAlábbi parancsokkal rendelkezem: \n' +
                    '!porn + "tematika": Küldök egy pornó képet a channelre, olyan témában amit a "tematika" helyett írsz be " jelek nélkül (csak 18+ channelre használd). \n' +
                    '!votemute "tag": (tag helyére tageld meg akit muteolni akarsz 30 sec-re aposztrófok nélkül), meg kell szavazni, 3 szavazat után érvényes. Admint, és botot nem muteolhatsz! \n' +
                    '!votenick "nicknév" "tag: nicknév helyére beírod a kívánt nevet, és tageled akinek a nevét meg akarod változtatni, ehhez 6 szavazat kell, hogy sikeres legyen. \n' +
                    '!kivagy + "tag" megmondja hogy te ki is vagy valójában. \nTovábbá sok káromkodás esetén jelzek hogy ne tedd. \n' +
                    '!kezelhetetlen: ha valaki rosszul viselkedik, helyre teszem egy pofon giffel.\n' +
                    '!praise1 vagy !praise2 + "emote" vagy "szöveg": isteni magaslatba emelem azt amit megadtál\n' +
                    'Ha elkezded a bohen rapsody vagy a never gonna give you up egy részletét, akkor folytatom azt, így együtt tudunk dalolászni (fontos, hogy pontos legyen aposztróf szükséges, hogy jó helyen legyen)\n' +
                    '"no bully" a szövegben azt eredményezi hogy egy stop képet küldök, az abuse megszüntetésére. \n' +
                    'Furrykról szóló tartalomhoz szívesen becsatlakozok én is beszélgetni. \nIlletve "megcsap" vagy "paskol" szövegrészekre is reagálok ha a mondandódban van. \nVégül ha ' +
                    'valamit 3-an beküldenek a channelre egymás után, akkor én is beszállok és megismétlem. \nTájékoztatót "!!help"-el kérhetsz, de ezt már úgy is tudod.');
                break;
            case 'kivagy':
                files = fs.readdirSync('./szerb');
                let member = msg.mentions.members.first();
                if (member.id === '518823389008232460' || member.id === '602525564217327637') {
                    attachment = new Discord.Attachment('./szerb/szerb_1.jpg');
                }
                else if (member.id === '376439826549047296'){
                    attachment = new Discord.Attachment('./szerb/TAP.png');
                }else {
                    attachment = new Discord.Attachment('./szerb/szerb_0.jpg');
                }

                msg.channel.send(attachment);
                break;
            /*case 'game':
                if (msg.channel.id === '713415837356392508') {
                    msg.channel.send('Milyen game-t szeretnél?');
                    const collector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id);
                    collector.on('collect', message => {
                        if (message.content.toLowerCase() === "wow") {
                            message.channel.send('Gyertek ' + func.tagList('wow', msg.author.id) + ' induljon az ungibungi');
                        } else if (message.content.toLowerCase() === "kf2") {
                            message.channel.send('Na ' + func.tagList('kf2', msg.author.id) + ' zombikat meg ki a faszom fog ölni?');
                        } else if (message.content.toLowerCase() === "lol") {
                            message.channel.send('Liga?? ' + func.tagList('lol', msg.author.id) + ' tesok gyertek apunak kéne win');
                        } else {
                            message.channel.send('Hát ezzel ti nem játszotok');
                        }
                        collector.stop();
                    });
                } else {
                    msg.channel.send('Ez nem az a szoba haver');
                }
                break;*/
            case 'votemute':
                msg.react('👍');

                msg.awaitReactions(voteMuteFilter, { max: 1, time: 10000, errors: ['time']})
                    .then( () => {
                        let mute_role = msg.guild.roles.find("name", "Mute");
                        let member = msg.mentions.members.first();
                        let hasRole = func.checkRole(msg, member);
                        member.addRole(mute_role); // <- this assign the role
                        member.removeRole(hasRole);
                        msg.channel.send('Muteolva');
                        setTimeout(() => {member.removeRole(mute_role); member.addRole(hasRole);}, 30 * 1000);
                    }).catch(r => {
                            msg.channel.send('Elutasítva');
                            console.log(r);
                        });
                break;
            case 'votenick':
                let uwuMember = msg.mentions.members.first();
                if (uwuMember.roles.has('671107459858956299')) {
                    msg.channel.send('Botot nem nevezhetsz át');
                    break;
                }
                msg.react('👍');

                msg.awaitReactions(voteNickFilter, { max: 1, time: 30000, errors: ['time']})
                    .then( () => {

                        uwuMember.setNickname(nickname, 'Sikeres Szavazás');
                        msg.channel.send('Sikeres átnevezés: ' + uwuMember);
                    }).catch(r => {
                    msg.channel.send('Elutasítva');
                    console.log(r);
                });
                break;
        }
    }

    if (songs.song.toLowerCase().includes(msg.content.toLowerCase())) {
        const startSong = msg.content.toLowerCase();
        const lowerCase = songs.song.toLowerCase();
        const splitSong = lowerCase.split('\n');
        for (let i = 0; i < splitSong.length; i++){
            if (splitSong[i] === startSong){
                msg.channel.send(splitSong[i+1]);
                break;
            }
        }
    }

    if (msg.content.substring(0, 1) === '.' && msg.channel.id === '704983142452428933') {
        let args = msg.content.substring(1).split(' ');
        let cmd = args[0];
        let channel = args[1];

        let channelId = func.getChannel(channel);
        msg.delete();
        let sentence = msg.content.slice(5);
        switch (cmd.toLocaleLowerCase()) {
            case 'say':
                if (channelId === '667783025811259448') {
                    client.channels.get('667783025811259448').send(sentence);
                } else {
                    client.channels.get(channelId).send(sentence.slice(channel.length + 1)).catch(data => {
                        console.log(data);
                    });
                }
                break;

            case 'sup':
                client.channels.get(channelId).send('<:surp:708969952354500658>');
                break;
            case 'tri':
                client.channels.get(channelId).send('<:trigger:708979797895938168>');
                break;
            case 'cute':
                client.channels.get(channelId).send('<:cute:735574079851200582>');
                break;
            case 'oh_no':
                client.channels.get(channelId).send('oh...nooo');
                client.channels.get(channelId).send('<:oh_no:735574451088785498>');
                break;
            case 'gimme':
                client.channels.get(channelId).send('<:gimme:744540992430145586>');
                break;
            case 'simp':
                client.channels.get(channelId).send('<:simp:744540966215483442>');
                break;
            case 'ew':
                client.channels.get(channelId).send('<:ew:744540932967235674>');
                break;
            case 'burn':
                client.channels.get(channelId).send('<:burn:744540895478808626>');
                break;
            case 'nameselj':
                client.channels.get(channelId).send('<:marotihaha:759804122139983873>');
        }
    }


    if (msg.content.toLowerCase() === 'baszadék') {
        msg.channel.send('Szopadék');
    } else if (msg.content.toLowerCase() === 'szopadék') {
        msg.channel.send('Baszadék');
    }

    if (msg.content.toLowerCase().includes('no bully')) {
        msg.channel.send('https://i.pinimg.com/originals/78/e3/6c/78e36c8c096aeb13b46a3b41cd934c9f.jpg');
    }

    if (msg.content.toLowerCase().includes('maróti') || msg.content.toLowerCase().includes('dimat') || msg.content.toLowerCase().includes('maroti')) {
        msg.react('759804122139983873');
    }

    if (msg.content.toLowerCase().includes('megcsap') || msg.content.toLowerCase().includes('paskol')) {
        msg.channel.send('<a:uwu_flotespanking:677984852963885075>');
    }

    if (func.swearListCheck(msg.content)) {
        swearStack++;
        let textArray = ['hagyd abba', 'Ne beszélj már csúnyán', 'Kell a baj?', 'Mit káromkodsz?', 'Moderáljad már magad', 'Szépen meg ki fog beszélni?', 'Kőban?', 'ffs'];
        let randomNumber = Math.floor(Math.random() * textArray.length);
        if (swearStack === 10) {
            msg.channel.send(textArray[randomNumber]);
            swearStack = 0;
        }
    }

    if (msg.content.toLocaleLowerCase().includes('furry')) {
        let furryArray = ['UwU', 'OwO', 'Uwuristen', '(　・`ω・´)', 'fuwurykról van szó?', 'Kruwuzor fuwury UwU'];
        let randomNumber = Math.floor(Math.random() * furryArray.length);
        msg.channel.send(furryArray[randomNumber]);
    }

    if (msg.content.toLocaleLowerCase().includes('nem mered')) {
        msg.channel.send('hang vaaaagy');
    }

    if (msg.content.toLocaleLowerCase().includes('nem leszek')) {
        msg.channel.send('Miért nem leszel? ( ._.) Lehet páran örülnének neki...');
    }

    if (msg.content.toLocaleLowerCase() === 'ok') {
        let flegmahResponse = ['Legalább ne flegmulj, másokat megsértesz :(', 'ok ok ok', 'flegma f***', 'Jó, inkább ne is írj semmit', 'Ne, ne írj rendeset', '"k" legalább csináld rendesen'];
        let randomNumber = Math.floor(Math.random() * flegmahResponse.length);
        msg.channel.send(flegmahResponse[randomNumber]);
    }

});

client.on('raw', packet => {
    // We don't want this to run on unrelated packets
    if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) return;
    // Grab the channel to check the message from
    const channel = client.channels.get(packet.d.channel_id);
    // There's no need to emit if the message is cached, because the event will fire anyway for that
    if (channel.messages.has(packet.d.message_id)) return;
    // Since we have confirmed the message is not cached, let's fetch it
    channel.fetchMessage(packet.d.message_id).then(message => {
        // Emojis can have identifiers of name:id format, so we have to account for that case as well
        const emoji = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
        // This gives us the reaction we need to emit the event properly, in top of the message object
        const reaction = message.reactions.get(emoji);
        // Adds the currently reacting user to the reaction's users collection.
        if (reaction) reaction.users.set(packet.d.user_id, client.users.get(packet.d.user_id));
        // Check which type of event it is before emitting
        if (packet.t === 'MESSAGE_REACTION_ADD') {
            client.emit('messageReactionAdd', reaction, client.users.get(packet.d.user_id));
        }
        if (packet.t === 'MESSAGE_REACTION_REMOVE') {
            client.emit('messageReactionRemove', reaction, client.users.get(packet.d.user_id));
        }
    });
});

client.on('messageDelete', message => {
    let channel = message.channel;
    let messagePic = '';
    let messageContent = '*none*';
    if (message.cleanContent.length > 0) {
        messageContent = message.cleanContent;
    }
    const textEmbed = new Discord.RichEmbed()
        .setColor('#9b18bf')
        .setTitle('Deleted Message')
        .setThumbnail(`${message.author.avatarURL}`)
        .setAuthor(`${message.author.username}`)
        .setDescription(`${channel}`)
        .addField('Message: ', messageContent, true)
        .setTimestamp();

    let attachment = (message.attachments).array();
    if (message.author.bot || message.channel.id === '704983142452428933' || message.channel.id === '740536932303634473') {

    }

    else if (message.attachments.size > 0) {
        client.channels.get("745317754256490567").fetchMessages({limit: 5}).then(messages => {
            let lastMessages = messages.array();

            for (let i = 0; i < lastMessages.length; i++) {
                if(lastMessages[i].content.includes(attachment[0].id)) {
                    messagePic = lastMessages[i].content.split(' ');
                    const pictureEmbed = new Discord.RichEmbed()
                        .setColor('#9b18bf')
                        .setTitle('Deleted Picture')
                        .setThumbnail(`${message.author.avatarURL}`)
                        .setAuthor(`${message.author.username}`)
                        .setImage(messagePic[0])
                        .setDescription(`${channel}`)
                        .addField('Message: ', messageContent, true)
                        .setTimestamp();
                    client.channels.get("740536932303634473").send(pictureEmbed);
                }
            }
        }).catch(console.error);
    } else {
        client.channels.get("740536932303634473").send(textEmbed);
    }
});

client.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.message.partial) {
        try {
            await reaction.message.fetch();
        } catch (error) {
            console.error('Something went wrong when fetching the message: ', error);
        }
    }
    if (reaction.emoji.name === '📌' ){
        await reaction.message.pin();
        const textEmbed = new Discord.RichEmbed()
            .setColor('#ff0015')
            .setTitle('Pinned Message')
            .setThumbnail(`${user.avatarURL}`)
            .setAuthor(`${user.username}`)
            .addField('Message: ', reaction.message.url, true)
            .setTimestamp();
        client.channels.get("740536932303634473").send(textEmbed);
    } else{
        console.log(`${reaction.emoji.name}`);
    }
});

//740536932303634473
client.login('NjgzNzAyNzgyODk2NzY3MDE2.XlvcZA.DbM0EvrKsUQpe43XnltT6ryVkHc');

function voteMuteFilter(reaction, user) {
    if (['👍'].includes(reaction.emoji.name)) {
        if (!voters.includes(user.id)) {
            voters.push(user.id);
        }
    }
    if (voters.length === 4) {
        voters = [];
        return true;
    }
}

function voteNickFilter(reaction, user) {
    if (['👍'].includes(reaction.emoji.name)) {
        if (!voters.includes(user.id)) {
            voters.push(user.id);
        }
    }
    if (voters.length === 5) {
        voters = [];
        return true;
    }
}

/*
<@251831600512368641> kuba
<@491660100990140436> flote
<@518823389008232460> dante
<@318072258465628161> senki
<@376439826549047296> ninja
<@602525564217327637> kurzi
<@295485347138240513> swarci
<@279565175588388865> karcsi
<@310397550173880320> vazul
<@239028474696826891> villanyos
<@623899095224025088> medimadi
 */
