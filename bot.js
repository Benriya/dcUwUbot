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
let files;
let chosenFile;
let attachment;
let sayAgain = [];
let swearStack = 0;

client.on('message', msg => {
    if(msg.author.bot) return;

    sayAgain.push({message: msg.content, author: msg.author});
    if (mimicSentence()) {
        msg.channel.send(sayAgain[1].message);
        sayAgain = [];
    }

    if (msg.content === 'ping') {
        msg.reply('Pong!');
    }

    if (msg.content.substring(0, 1) === '!') {
        let args = msg.content.substring(1).split(' ');
        let cmd = args[0];

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
            case 'game':
                if (msg.channel.id === '713415837356392508') {
                    msg.channel.send("Milyen game-t szeretnél?");
                    const collector = new MessageCollector(msg.channel, m => m.author.id === msg.author.id);
                    collector.on('collect', message => {
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
                    collector.stop();
                }
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
        }
    }

    if (msg.content.toLowerCase().includes('megcsap') || msg.content.toLowerCase().includes('paskol')) {
        msg.channel.send('<a:uwu_flotespanking:677984852963885075>');
    }

    if (swearListCheck(msg.content)) {
        swearStack++;
        console.log(swearStack);
        console.log(msg.content);
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

function mimicSentence() {
    if (sayAgain.length > 3) {
        sayAgain.shift();
        if (checkIfSame()) {
            return true;
        }
    }
    if (sayAgain.length === 3) {
        if (checkIfSame()) {
            return true;
        }
    }
}

function checkIfSame() {
    if (sayAgain[0].message === sayAgain[1].message && sayAgain[0].message === sayAgain[2].message && sayAgain[0].author !== sayAgain[1].author && sayAgain[0].author !== sayAgain[2].author) {
        return true;
    }
}

function swearListCheck(message) {
    let swearList = ['anyád', 'geci', 'hugy', 'kurva', 'ribanc', 'buzi', 'picsába', 'fasz', 'szar ', 'fos', 'rühes', 'gedva', 'csicska', 'pina'];
    for (let i = 0; i < swearList.length; i++) {
        if(message.toLowerCase().includes(swearList[i])) {
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
