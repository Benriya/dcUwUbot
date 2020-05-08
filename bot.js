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
const { Client, Attachment } = require('discord.js');
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

            args = args.splice(1);
            switch (cmd.toLocaleLowerCase()) {
                case 'kuss':
                    user = msg.content.slice(6);
                    break;
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
            }
        }

        if (msg.content.substring(0, 1) === '.' && msg.channel.id === '704983142452428933') {
            let args = msg.content.substring(1).split(' ');
            let cmd = args[0];
            let channel = args[1];

            args = args.splice(1);
            switch (cmd.toLocaleLowerCase()) {
                case 'say':
                    console.log(channel);
                    let sentence = msg.content.slice(5);
                    msg.delete();
                    switch (channel) {
                        case 'suwuli':
                            client.channels.get(`706776570836156426`).send(sentence.slice(7));
                            break;

                        case 'kuwuka':
                            client.channels.get(`671309309757358123`).send(sentence.slice(7));
                            break;

                        case '18':
                            client.channels.get(`667779656363278367`).send(sentence.slice(3));
                            break;

                        case 'mowozi':
                            client.channels.get(`699657394506170469`).send(sentence.slice(7));
                            break;

                        case 'owoff':
                            client.channels.get(`667783025811259448`).send(sentence.slice(6));
                            break;

                        default:
                            client.channels.get(`667783025811259448`).send(sentence);
                            break;
                    }
            }
        }

    if (msg.content.toLowerCase().includes('megcsap') || msg.content.toLowerCase().includes('paskol')) {
        msg.channel.send('<a:uwu_flotespanking:677984852963885075>');
    }

    if (msg.content === 'test') {
        msg.channel.send('<a:kittyroll:597942521536053261>');
    }

    if (swearListCheck(msg.content)) {
        swearStack++;
        console.log(swearStack);
        console.log(msg.content);
        let textArray = ['hagyd abba', 'Ne beszélj már csúnyán', 'Kell a baj?', 'Mit káromkodsz?', 'Hát már megint káromkodik :kekwall:', 'Kőban?', 'ffs'];
        let randomNumber = Math.floor(Math.random() * textArray.length);
        if (swearStack === 5) {
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

client.login('NjgzNzAyNzgyODk2NzY3MDE2.XlvcZA.DbM0EvrKsUQpe43XnltT6ryVkHc');
