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

client.on('message', msg => {

    //const chanel = client.channels.find('kuwuka', kuwuka)
    //671309309757358123

    if(msg.author.bot) return;
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

            args = args.splice(1);
            switch (cmd.toLocaleLowerCase()) {
                case 'say':
                    let sentence = msg.content.slice(5);
                    msg.delete();
                    client.channels.get(`667783025811259448`).send(sentence);
            }
        }

    if (msg.content.toLocaleLowerCase().includes('furry')) {
        let furryArray = ['UwU', 'OwO', 'Uwuristen', '(　・`ω・´)', 'fuwurykról van szó?', 'Kruwuzor fuwury UwU'];
        let randomNumber = Math.floor(Math.random() * furryArray.length);
        msg.channel.send(furryArray[randomNumber]);
    }

});
client.login('NjgzNzAyNzgyODk2NzY3MDE2.XlvcZA.DbM0EvrKsUQpe43XnltT6ryVkHc');
