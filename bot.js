/*require('heroku-self-ping').default("https://discord8w8bot.herokuapp.com");

const http = require('http');

const PORT = process.env.PORT || 4040;
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World 2');
});
server.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});*/

const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
    console.log(Date.now() + " Ping Received");
    response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const PornSearch = require('pornsearch');
const gifSearch = require('gif-search');
const songs = require('./songs');
const func = require('./functions');
const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

let fs = require('fs');
let files;
let chosenFile;
let swearStack = 0;
let voters = [];
let member;
let lottoArray = new Map() ;

client.on('message', msg => {
    if(msg.author.bot) return;

    const istenEmbed = new Discord.MessageEmbed()
        .setColor('#fff200')
        .setTitle('Az Isten')
        .setThumbnail(`${msg.author.avatarURL()}`)
        .setAuthor(`${msg.author.username}`)
        .addField('Message: ',
            '┌──── •✧Wall Of Isten✧• ────┐\n' +
            `           (っ◔◡◔)っ-${msg.author.username}\n` +
            '└───── •✧✧✧✧✧✧✧• ─────┘', true)
        .setTimestamp();

    let attachment = (msg.attachments).array();
    if (msg.attachments.size > 0) {
        client.channels.cache.get("745317754256490567").send(`${attachment[0].proxyURL} id: ${attachment[0].id}`);
    }

    msg.channel.messages.fetch({limit: 3}).then(messages => {
        let lastMessage = messages.first();
        let lastMessages = messages.array();

        if (!lastMessage.author.bot) {
            if (func.checkIfSame(lastMessages)){
                client.channels.cache.get(msg.channel.id).send(lastMessage.content);
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
                attachment = new Discord.MessageAttachment('./rule.png');
                client.channels.cache.get(msg.channel.id).send(attachment);
                break;
            case 'praise1':
                client.channels.cache.get(msg.channel.id).send(nickname + '<:head:767421798786138154>\n' + '<:hand:767421873360601168>' + '<:face:767421929366749184>');
                break;
            case 'praise2':
                client.channels.cache.get(msg.channel.id).send(nickname + '<:popehead:767494031193407509>\n' + '<:popehand:767494212794843186>' + '<:popeface:767494094616133683>');
                break;
            case 'kezelhetetlen':
                files = fs.readdirSync('./slap');
                chosenFile = files[Math.floor(Math.random() * files.length)];
                attachment = new Discord.MessageAttachment('./slap/' + chosenFile);
                client.channels.cache.get(msg.channel.id).send(attachment);
                break;
            case 'porn':
                const Searcher = new PornSearch(sentence);
                Searcher.gifs()
                    .then(gifs => {
                        client.channels.cache.get(msg.channel.id).send(gifs[Math.floor(Math.random() * gifs.length)].webm)
                    }).catch(err =>{
                    client.channels.cache.get(msg.channel.id).send('Nincs találat');
                        console.log('nothing found');
                });
                break;
            /*case 'test':
                let pornSauce = [];
                const pornSearch = new PornSearch(sentence);
                pornSearch.gifs()
                    .then(gifs => {
                        msg.channel.send(gifs[Math.floor(Math.random() * gifs.length)].webm);
                    }).catch(err =>{
                    console.log(err);
                });
                pornSearch.videos()
                    .then(videos => {
                        pornSauce = videos.map(videos => videos.url);
                        console.log(pornSauce);
                        msg.channel.send(pornSauce[Math.floor(Math.random() * pornSauce.length)]);
                    }).catch(err =>{
                    console.log(err);
                });
                break;*/
            case '!help':
                msg.author.send('Szoszi \nAlábbi parancsokkal rendelkezem: \n' +
                    '!porn + "tematika": Küldök egy pornó képet a channelre, olyan témában amit a "tematika" helyett írsz be " jelek nélkül (csak 18+ channelre használd). \n' +
                    '!votemute "tag": (tag helyére tageld meg akit muteolni akarsz 30 sec-re aposztrófok nélkül), meg kell szavazni, 3 szavazat után érvényes. Admint, és botot nem muteolhatsz! \n' +
                    '!votenick "nicknév" "tag: nicknév helyére beírod a kívánt nevet, és tageled akinek a nevét meg akarod változtatni, ehhez 6 szavazat kell, hogy sikeres legyen. \n' +
                    '!kivagy + "tag" megmondja hogy te ki is vagy valójában. \nTovábbá sok káromkodás esetén jelzek hogy ne tedd. \n' +
                    '!kezelhetetlen: ha valaki rosszul viselkedik, helyre teszem egy pofon giffel.\n' +
                    '!praise1 vagy !praise2 + "emote" vagy "szöveg": isteni magaslatba emelem azt amit megadtál\n' +
                    '!csicskawall: kilistázom a csicska tanárokat\n' +
                    '!aranywall: kilistázom aranyember tanárokat\n' +
                    '!istenwall: meg mondom ki az isten\n' +
                    'Ha elkezded a bohen rapsody vagy a never gonna give you up egy részletét, akkor folytatom azt, így együtt tudunk dalolászni (fontos, hogy pontos legyen aposztróf szükséges, hogy jó helyen legyen)\n' +
                    '"no bully" a szövegben azt eredményezi hogy egy stop képet küldök, az abuse megszüntetésére. \n' +
                    'Furrykról szóló tartalomhoz szívesen becsatlakozok én is beszélgetni. \nIlletve "megcsap" vagy "paskol" szövegrészekre is reagálok ha a mondandódban van. \nVégül ha ' +
                    'valamit 3-an beküldenek a channelre egymás után, akkor én is beszállok és megismétlem. \nTájékoztatót "!!help"-el kérhetsz, de ezt már úgy is tudod.');
                break;
            case 'kivagy':
                member = msg.mentions.users.first();

                if (member.id === '518823389008232460' || member.id === '602525564217327637' || member.id === '623899095224025088') {
                    attachment = new Discord.MessageAttachment('./szerb/szerb_1.jpg');
                }
                else if (member.id === '376439826549047296'){
                    attachment = new Discord.MessageAttachment('./szerb/TAP.png');
                }else {
                    attachment = new Discord.MessageAttachment('./szerb/szerb_0.jpg');
                }her

                client.channels.cache.get(msg.channel.id).send(attachment);
                break;
            case 'csicskawall':
                client.channels.cache.get(msg.channel.id).send(
                    '┌───── •✧Wall Of Csicska✧• ─────┐\n' +
                    '      Bánhelyi Balázs\n' +
                    '      **Csendes Tibor**\n' +
                    '      Csókás Eszter\n' +
                    '      Gazdag-Tóth Boglárka Dr.\n' +
                    '      Hirling Dominik\n' +
                    '      **Kulin Julia**\n' +
                    '      Márkus András\n' +
                    '      Pletl Szilveszter Dr.\n' +
                    '      Pflanzer Tamás\n' +
                    '      Pluhár András\n' +
                    '      London András\n' +
                    '      Vida Ágnes\n' +
                    '└───── •✧✧✧✧✧✧✧✧✧✧• ─────┘');
                break;
            case 'aranywall':
                client.channels.cache.get(msg.channel.id).send(
                    '┌──── •✧Wall Of Aranyember✧• ────┐\n' +
                    '      Balogh András\n' +
                    '      Cservenák Bence\n' +
                    '      Győrffy Lajos\n' +
                    '      Heinc Emília\n' +
                    '      Kátai Kamilla\n' +
                    '      Kardos Péter\n' +
                    '      Kardos Péter Dr.\n' +
                    '      Fülöp Vanda\n' +
                    '      Keleti Márton\n' +
                    '      Kicsi András\n' +
                    '      Kunos Ádám\n' +
                    '      Maróti Miklós\n' +
                    '      Szabó Tamás\n' +
                    '      Szabolcs Iván\n' +
                    '└───── •✧✧✧✧✧✧✧✧✧• ─────┘');
                break;
            case 'istenwall':
                client.channels.cache.get(msg.channel.id).send(istenEmbed);
                break;
            case 'lotto':
                member = msg.author.username;
                let tips = args[1];
                lottoArray = func.addMemberLotto(tips, member, lottoArray);
                console.log(lottoArray);
                //client.channels.cache.get(msg.channel.id).send(istenEmbed);
                break;
            case 'hess':
                attachment = new Discord.MessageAttachment('./szerb/hess.gif');
                client.channels.cache.get(msg.channel.id).send(attachment);
                break;
            case 'votemute':
                msg.react('👍');

                msg.awaitReactions(voteMuteFilter, { max: 1, time: 10000, errors: ['time']})
                    .then(async () => {
                        let mute_role = msg.guild.roles.cache.get("686288799109480523");
                        let member = msg.mentions.members.first();
                        await member.roles.add(mute_role);
                        await client.channels.cache.get(msg.channel.id).send('Muteolva');
                        setTimeout(() => {member.roles.remove(mute_role);
                        }, 30 * 1000);
                    }).catch(r => {
                    client.channels.cache.get(msg.channel.id).send('Elutasítva');
                            console.log(r);
                        });
                break;
            case 'votenick':
                let uwuMember = msg.mentions.members.first();
                try{
                    if (uwuMember.roles.cache.has('671107459858956299')) {
                        client.channels.cache.get(msg.channel.id).send('Botot nem nevezhetsz át');
                        break;
                    }
                } catch (err){
                    console.log('error');
                }

                msg.react('👍');

                msg.awaitReactions(voteNickFilter, { max: 1, time: 30000, errors: ['time']})
                    .then( () => {

                        uwuMember.setNickname(nickname, 'Sikeres Szavazás');
                        client.channels.cache.get(msg.channel.id).send('Sikeres átnevezés: ' + uwuMember.user.username);
                    }).catch(r => {
                    client.channels.cache.get(msg.channel.id).send('Elutasítva');
                    console.log(r);
                });
                break;
        }
    }
    if(msg.attachments.size === 0) {
        if (songs.song.toLowerCase().includes(msg.content.toLowerCase())) {
            const startSong = msg.content.toLowerCase();
            const lowerCase = songs.song.toLowerCase();
            const splitSong = lowerCase.split('\n');
            for (let i = 0; i < splitSong.length; i++) {
                if (splitSong[i] === startSong) {
                    client.channels.cache.get(msg.channel.id).send(splitSong[i + 1]);
                    break;
                }
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
                    client.channels.cache.get('667783025811259448').send(sentence);
                } else {
                    client.channels.cache.get(channelId).send(sentence.slice(channel.length + 1)).catch(data => {
                        console.log(data);
                    });
                }
                break;

            case 'sup':
                client.channels.cache.get(channelId).send('<:surp:708969952354500658>');
                break;
            case 'tri':
                client.channels.cache.get(channelId).send('<:trigger:708979797895938168>');
                break;
            case 'cute':
                client.channels.cache.get(channelId).send('<:cute:735574079851200582>');
                break;
            case 'oh_no':
                client.channels.cache.get(channelId).send('oh...nooo');
                client.channels.cache.get(channelId).send('<:oh_no:735574451088785498>');
                break;
            case 'gimme':
                client.channels.cache.get(channelId).send('<:gimme:744540992430145586>');
                break;
            case 'simp':
                client.channels.cache.get(channelId).send('<:simp:744540966215483442>');
                break;
            case 'ew':
                client.channels.cache.get(channelId).send('<:ew:744540932967235674>');
                break;
            case 'burn':
                client.channels.cache.get(channelId).send('<:burn:744540895478808626>');
                break;
            case 'nameselj':
                client.channels.cache.get(channelId).send('<:marotihaha:759804122139983873>');
        }
    }

    if (msg.author.id === '376439826549047296' && msg.content.toLowerCase() === 'tap') {
        attachment = new Discord.MessageAttachment('./szerb/ninjatap.png');
        client.channels.cache.get(msg.channel.id).send(attachment);
    }

    if (msg.content.toLowerCase() === 'baszadék') {
        client.channels.cache.get(msg.channel.id).send('Szopadék');
    } else if (msg.content.toLowerCase() === 'szopadék') {
        client.channels.cache.get(msg.channel.id).send('Baszadék');
    }

    if (msg.content.toLowerCase().includes('no bully')) {
        client.channels.cache.get(msg.channel.id).send('https://i.pinimg.com/originals/78/e3/6c/78e36c8c096aeb13b46a3b41cd934c9f.jpg');
    }

    if (msg.content.toLowerCase().includes('maróti') || msg.content.toLowerCase().includes('dimat') || msg.content.toLowerCase().includes('maroti') || msg.content.toLowerCase().includes('aranyember')) {
        msg.react('759804122139983873');
    }

    if (msg.content.toLowerCase().includes('brc')) {
        msg.react('767665863649787924');
    }

    if (msg.content.toLowerCase().includes('megcsap') || msg.content.toLowerCase().includes('paskol')) {
        client.channels.cache.get(msg.channel.id).send('<a:uwu_flotespanking:677984852963885075>');
    }

    if (func.swearListCheck(msg.content)) {
        swearStack++;
        let textArray = ['hagyd abba', 'Ne beszélj már csúnyán', 'Kell a baj?', 'Mit káromkodsz?', 'Moderáljad már magad', 'Szépen meg ki fog beszélni?', 'Kőban?', 'ffs'];
        let randomNumber = Math.floor(Math.random() * textArray.length);
        if (swearStack === 10) {
            client.channels.cache.get(msg.channel.id).send(textArray[randomNumber]);
            swearStack = 0;
        }
    }

    if (msg.content.toLocaleLowerCase().includes('furry')) {
        let furryArray = ['UwU', 'OwO', 'Uwuristen', '(　・`ω・´)', 'fuwurykról van szó?', 'Kruwuzor fuwury UwU'];
        let randomNumber = Math.floor(Math.random() * furryArray.length);
        client.channels.cache.get(msg.channel.id).send(furryArray[randomNumber]);
    }

    if (msg.content.toLocaleLowerCase().includes('nem mered')) {
        client.channels.cache.get(msg.channel.id).send('hang vaaaagy');
    }

    if (msg.content.toLocaleLowerCase().includes('nem leszek')) {
        client.channels.cache.get(msg.channel.id).send('Miért nem leszel? ( ._.) Lehet páran örülnének neki...');
    }

    if (msg.content.toLocaleLowerCase() === 'ok') {
        let flegmahResponse = ['Legalább ne flegmulj, másokat megsértesz :(', 'ok ok ok', 'flegma f***', 'Jó, inkább ne is írj semmit', 'Ne, ne írj rendeset', '"k" legalább csináld rendesen'];
        let randomNumber = Math.floor(Math.random() * flegmahResponse.length);
        client.channels.cache.get(msg.channel.id).send(flegmahResponse[randomNumber]);
    }

});

client.on('messageDelete', message => {
    let channel = message.channel;
    let messagePic = '';
    let messageContent = '*none*';
    if (message.cleanContent.length > 0) {
        messageContent = message.cleanContent;
    }
    const textEmbed = new Discord.MessageEmbed()
        .setColor('#9b18bf')
        .setTitle('Deleted Message')
        .setThumbnail(`${message.author.avatarURL()}`)
        .setAuthor(`${message.author.username}`)
        .setDescription(`${channel}`)
        .addField('Message: ', messageContent, true)
        .setTimestamp();

    let attachment = (message.attachments).array();
    if (message.author.bot || message.channel.id === '704983142452428933' || message.channel.id === '740536932303634473') {

    }

    else if (message.attachments.size > 0) {
        client.channels.cache.get("745317754256490567").messages.fetch({limit: 5}).then(messages => {
            let lastMessages = messages.array();

            for (let i = 0; i < lastMessages.length; i++) {
                if(lastMessages[i].content.includes(attachment[0].id)) {
                    messagePic = lastMessages[i].content.split(' ');
                    const pictureEmbed = new Discord.MessageEmbed()
                        .setColor('#9b18bf')
                        .setTitle('Deleted Picture')
                        .setThumbnail(`${message.author.avatarURL()}`)
                        .setAuthor(`${message.author.username}`)
                        .setImage(messagePic[0])
                        .setDescription(`${channel}`)
                        .addField('Message: ', messageContent, true)
                        .setTimestamp();
                    client.channels.cache.get("740536932303634473").send(pictureEmbed);
                }
            }
        }).catch(console.error);
    } else {
        client.channels.cache.get("740536932303634473").send(textEmbed);
    }
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

client.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.message.partial) {
        try {
            if (reaction.emoji.name === '📌') {
                await reaction.message.fetch();
            }
        } catch (error) {
            console.error('Something went wrong when fetching the message: ', error);
        }
    }

    if (reaction.emoji.name === '📌'){
        await reaction.message.pin();
        const textEmbed = new Discord.MessageEmbed()
            .setColor('#ff0015')
            .setTitle('Pinned Message')
            .setThumbnail(`${user.avatarURL()}`)
            .setAuthor(`${user.username}`)
            .addField('Message: ', reaction.message.url, true)
            .setTimestamp();
        client.channels.cache.get("740536932303634473").send(textEmbed);
    }
});

//740536932303634473
client.login('token');

function voteMuteFilter(reaction, user) {
    if (['👍'].includes(reaction.emoji.name)) {
        if (!voters.includes(user.id)) {
            voters.push(user.id);
        }
    }else {
        console.log(reaction.emoji.name);
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
