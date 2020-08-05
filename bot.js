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
const { Client, Attachment, Discord, MessageCollector } = require('discord.js');
const client = new Client();
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

user = '';
fs = require('fs');
let voters = [];
let files;
let chosenFile;
let attachment;
let swearStack = 0;

client.on('message', msg => {
    if(msg.author.bot) return;

    msg.channel.fetchMessages({limit: 3}).then(messages => {
        let lastMessage = messages.first();
        let lastMessages = messages.array();

        if (!lastMessage.author.bot) {
            if (checkIfSame(lastMessages)){
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

        let sentence = msg.content.slice(9);
        switch (cmd.toLocaleLowerCase()) {
            case 'meme':
                files = fs.readdirSync('./net');
                chosenFile = files[Math.floor(Math.random() * files.length)];
                attachment = new Attachment('./net/' + chosenFile);
                msg.channel.send(attachment);
                break;
            case 'porn':
                files = fs.readdirSync('./18');
                chosenFile = files[Math.floor(Math.random() * files.length)];
                attachment = new Attachment('./18/' + chosenFile);
                msg.channel.send(attachment);
                break;
            case '!help':
                msg.author.send('Szoszi \nAlábbi parancsokkal rendelkezem: \n!meme: Küldök egy meme-t a channelre \n!porn: Küldök egy pornó képet a channelre (csak 18+ channelre használd). \n' +
                    '!votemute "tag": (tag helyére tageld meg akit muteolni akarsz 30 sec-re aposztrófok nélkül), meg kell szavazni, 3 szavazat után érvényes. Admint, és botot nem muteolhatsz! \n' +
                    'Játékowosban használható parancsom: !game majd megkérdem melyik játékkal szeretnél játszani, ha rendelkezem vele akkor meg tagelem azokat akik azzal a játékkal szoktak játszani. \n' +
                    'Egyébként meg tájékoztatlak, hogy az adott játék nem szerepel nálam. \nElérhető game-k: "lol", "wow", "kf2" (bővülni fog). \nTovábbá sok káromkodás esetén jelzek hogy ne tedd. \n' +
                    'Furrykról szóló tartalomhoz szívesen becsatlakozok én is beszélgetni. \nIlletve "megcsap" vagy "paskol" szövegrészekre is reagálok ha a mondandódban van. \nVégül ha ' +
                    'valamit 3-an beküldenek a channelre egymás után, akkor én is beszállok és megismétlem. \nTájékoztatót "!!help"-el kérhetsz, de ezt már úgy is tudod.');
                break;
            case 'game':
                if (msg.channel.id === '713415837356392508') {
                    msg.channel.send('Milyen game-t szeretnél?');
                    const collector = new MessageCollector(msg.channel, m => m.author.id === msg.author.id);
                    collector.on('collect', message => {
                        /*const gameName = message.content;
                        if (gameSelect(message.content)) {
                            message.channel.send('Fel, le akarsz iratkozni vagy tagelni?');
                            if (message.content.toLowerCase() === 'add') {
                                postPlayer(msg.author.id, gameName);
                            }
                        }*/
                        if (message.content.toLowerCase() === "wow") {
                            message.channel.send('Gyertek ' + taglist('wow', msg.author.id) + ' induljon az ungibungi');
                        } else if (message.content.toLowerCase() === "kf2") {
                            message.channel.send('Na ' + taglist('kf2', msg.author.id) + ' zombikat meg ki a faszom fog ölni?');
                        } else if (message.content.toLowerCase() === "lol") {
                            message.channel.send('Liga?? ' + taglist('lol', msg.author.id) + ' tesok gyertek apunak kéne win');
                        } else {
                            message.channel.send('Hát ezzel ti nem játszotok');
                        }
                        collector.stop();
                    });
                } else {
                    msg.channel.send('Ez nem az a szoba haver');
                }
                break;
            case 'votemute':
                msg.react('👍');

                msg.awaitReactions(filter, { max: 1, time: 10000, errors: ['time']})
                    .then( () => {
                        let mute_role = msg.guild.roles.find("name", "Mute");
                        let member = msg.mentions.members.first();
                        let hasRole = checkRole(msg, member);
                        member.addRole(mute_role); // <- this assign the role
                        member.removeRole(hasRole);
                        msg.channel.send('Muteolva');
                        setTimeout(() => {member.removeRole(mute_role); member.addRole(hasRole);}, 30 * 1000);
                    }).catch(r => {
                            msg.channel.send('Elutasítva');
                            console.log(r);
                        });
                break;

        }
    }

    if (msg.content.substring(0, 1) === '.' && msg.channel.id === '704983142452428933') {
        let args = msg.content.substring(1).split(' ');
        let cmd = args[0];
        let channel = args[1];

        let channelId = getChannel(channel);
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
        }
    }

    if (msg.content.toLowerCase().includes('megcsap') || msg.content.toLowerCase().includes('paskol')) {
        msg.channel.send('<a:uwu_flotespanking:677984852963885075>');
    }

    if (swearListCheck(msg.content)) {
        swearStack++;
        let textArray = ['hagyd abba', 'Ne beszélj már csúnyán', 'Kell a baj?', 'Mit káromkodsz?', 'Hát már megint káromkodik :kekwall:', 'Kőban?', 'ffs'];
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
        let flegmahResponse = ['Legalább nem flegmulj, másokat megsértesz :(', 'ok ok ok', 'flegma f***', 'Jó, inkább ne is írj semmit', 'Ne, ne írj rendeset', '"k" legalább csináld rendesen'];
        let randomNumber = Math.floor(Math.random() * flegmahResponse.length);
        msg.channel.send(flegmahResponse[randomNumber]);
    }

});

client.on('messageDelete', message => {
    let channel = message.channel;
    let attachment = (message.attachments).array();
    if (message.attachments.size > 0) {
        client.channels.get("740536932303634473").send(`${message.author.username} üzenete: "${message.cleanContent}". From: ${channel} Kép: ${attachment[0].proxyURL}`);
    } else {
        client.channels.get("740536932303634473").send(`${message.author.username} üzenete: "${message.cleanContent}" From: ${channel}.`);
    }
});

function getChannel(channel) {
    switch (channel) {
        case 'suwuli':
            return '706776570836156426';

        case 'kuwuka':
            return '671309309757358123';

        case '18':
            return '667779656363278367';

        case 'mowozi':
            return '699657394506170469';

        case 'owoff':
            return '667783025811259448';

        case 'altalanowos':
            return '661569831111491618';

        case 'jatekowos':
            return '713415837356392508';

        default:
            return '667783025811259448';
    }
}

function checkRole(message, member) {
    let freeman = message.guild.roles.find("name", "Freeman");
    let osmagyar = message.guild.roles.find("name", "Ősmagyar");
    let kanker = message.guild.roles.find("name", "Kanker");
    let kanker2 = message.guild.roles.find("name", "kanker csak hupikék");
    let streamer = message.guild.roles.find("name", "Streamer");
    let vili = message.guild.roles.find("name", "Csiling-Csiling");
    let dino = message.guild.roles.find("name", "Dinoszaurusz");

    let roleArray = [freeman, osmagyar, kanker, kanker2, streamer, vili, dino];

    for (let i = 0; i < roleArray.length ; i++) {
        if (member.roles.has(roleArray[i].id)) {
            return roleArray[i];
        }
    }
}

function filter(reaction, user) {
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

function checkIfSame(array) {
    if (array[0].author !== array[1].author && array[1].author !== array[2].author && array[0].author !== array[2].author && array[0].content === array[1].content && array[1].content === array[2].content) {
        return true;
    }
}

function swearListCheck(message) {
    let swearList = ['anyád', 'geci', 'hugy', 'kurva', 'ribanc', 'buzi', 'picsába', 'fasz', 'szar ', 'rühes', 'gedva', 'csicska', 'pina'];
    for (let i = 0; i < swearList.length; i++) {
        if(message.toLowerCase().includes(swearList[i])) {
            return true;
        }
    }
}

function gameSelect(message) {
    let gameList = ['wow', 'lol', 'kf2'];
    for (let i = 0; i < gameList.length; i++) {
        if(message.toLowerCase().includes(gameList[i])) {
            return true;
        }
    }
}

function playerChange(players, author) {
    return players.replace('<@' + author + '>', '');
}

function taglist(game, author) {
    let players;
    switch (game) {
        case 'wow':
            players = '<@491660100990140436> <@518823389008232460> <@318072258465628161>';
            break;
        case 'kf2':
            players = '<@279565175588388865> <@295485347138240513> <@602525564217327637> <@376439826549047296> <@318072258465628161> <@518823389008232460>';
            break;
        case 'lol':
            players = '<@295485347138240513> <@310397550173880320> <@239028474696826891> <@279565175588388865>';
            break;
    }
    return playerChange(players, author);

}

client.login('NjgzNzAyNzgyODk2NzY3MDE2.XlvcZA.DbM0EvrKsUQpe43XnltT6ryVkHc');

/*
<@491660100990140436> flote
<@518823389008232460> dante
<@318072258465628161> senki
<@376439826549047296> ninja
<@602525564217327637> kurzi
<@295485347138240513> swarci
<@279565175588388865> karcsi
<@310397550173880320> vazul
<@239028474696826891> villanyos
 */
