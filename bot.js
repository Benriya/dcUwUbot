require('heroku-self-ping').default("https://discord8w8bot.herokuapp.com");

const http = require('http');

const PORT = process.env.PORT || 4040;
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Szia Dawe');
});
server.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

const PornSearch = require('pornsearch');
const gifSearch = require('gif-search');
const songs = require('./songs');
const func = require('./functions');
const Discord = require('discord.js');
const database = require('./database/handle_database');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

let fs = require('fs');
let files;
let chosenFile;
let voters = [];
let member;
let winningNumbers = [];
let winners = [];


    setInterval(async () => {
        let nowDate = new Date();
        if (nowDate.getMinutes() === 0 && nowDate.getHours() % 3 === 0) {
            client.channels.cache.get("779395227688501298").send('***Lotto***');
            let checkNumbers = await func.setLottoNumbers();
            let getNumbers = await func.setLottoNumbers('draw');
            client.channels.cache.get('779395227688501298').send(checkNumbers);
            winningNumbers = func.drawNumbers();
            client.channels.cache.get('779395227688501298').send('Nyertes számok: ' + winningNumbers);
            winners = func.drawWinners(getNumbers, winningNumbers);

            const list = client.guilds.cache.get("661569830469632007");
            let nyertes = list.roles.cache.get('779370085487083520');
            list.members.cache.array().forEach(member => {
                if (member.roles.cache.has('779370085487083520')) {
                    member.roles.remove('779370085487083520');
                }
                for (let i = 0; i < client.users.cache.array().length; i++) {
                    if (member.user.username === winners[i]) {
                        member.roles.add(nyertes);
                        client.channels.cache.get("779395227688501298").send('Nyertes: ' + '<@' + member.user.id + '>');
                    }
                }
            });
            winners = [];
            winningNumbers = [];
            await database.deleteLottoTips();
            client.channels.cache.get("779395227688501298").send('Új hét indult az uwuLottón, tegyétek meg szavazataitokat 🙂');
        }
    },60 * 1000);

client.on('message', async msg => {

    if (msg === undefined) return;
    await client.user.setActivity("The truth | !!help");
    if (msg.author.bot) return;

    let args = msg.content.substring(1).split(' ');
    let cmd = args[0];


    const istenEmbed = new Discord.MessageEmbed()
        .setColor('#fff200')
        .setTitle('Az Isten')
        .setThumbnail(`${msg.author.avatarURL()}`)
        .setAuthor(`${msg.author.username}`)
        .addField('Message: ',
            '┌─ •✧Wall Of Isten✧• ─┐\n' +
            `           (っ◔◡◔)っ-${msg.author.username}\n` +
            '└── •✧✧✧✧✧✧✧• ──┘', true)
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
        await msg.reply('Pong!');
    }

    if (msg.content.substring(0, 1) === '!') {
        let pornChannel = '667779656363278367';
        let sentence = msg.content.slice(5);
        let nickname = args[1];

        console.log(cmd.toLocaleLowerCase());

        if(cmd.toLocaleLowerCase() !== 'kivagy' && cmd.toLocaleLowerCase() !== 'votenick' && cmd.toLocaleLowerCase() !== 'votemute') {
            if (sentence !== undefined) {
                if (sentence.includes('@')) {
                    return;
                }
            }
            if (args[1] !== undefined) {
                if (args[1].includes('@')) {
                    return;
                }
            }
        }
        switch (cmd.toLocaleLowerCase()) {
            case 'rule':
                attachment = new Discord.MessageAttachment('./rule.png');
                client.channels.cache.get(msg.channel.id).send(attachment);
                break;
            case 'hirling':
                attachment = new Discord.MessageAttachment('./szerb/hirling.png');
                client.channels.cache.get(msg.channel.id).send(attachment);
                break;
            case 'csokas':
                attachment = new Discord.MessageAttachment('./szerb/csokas.png');
                client.channels.cache.get(msg.channel.id).send('Csókás csókás');
                client.channels.cache.get(msg.channel.id).send(attachment);
                attachment = new Discord.MessageAttachment('./szerb/fasszopokas.png');
                client.channels.cache.get(msg.channel.id).send(attachment);
                break;
            case 'faszom':
                attachment = new Discord.MessageAttachment('./szerb/picsaba.png');
                client.channels.cache.get(msg.channel.id).send(attachment);
                break;
            case 'praise':
                client.channels.cache.get(msg.channel.id).send(nickname + '<:head:767421798786138154>\n' + '<:hand:767421873360601168>' + '<:face:767421929366749184>');
                break;
            case 'kurai':
                await msg.delete();
                let szoveg = func.randomKuraiSzoveg();
                client.channels.cache.get(msg.channel.id).send(szoveg);
                break;
            case 'monke':
                attachment = new Discord.MessageAttachment('./szerb/monke.png');
                client.channels.cache.get(msg.channel.id).send(attachment);
                break;
            case 'vicci':
                attachment = new Discord.MessageAttachment('./szerb/vicci.jpg');
                client.channels.cache.get(msg.channel.id).send(attachment);
                break;
            case 'uwu':
                attachment = new Discord.MessageAttachment('./szerb/uwu.gif');
                client.channels.cache.get(msg.channel.id).send(attachment);
                break;
            case 'assemble':
                attachment = new Discord.MessageAttachment('./szerb/assemble.gif');
                client.channels.cache.get(msg.channel.id).send(attachment);
                break;
            case 'kezelhetetlen':
                files = fs.readdirSync('./slap');
                chosenFile = files[Math.floor(Math.random() * files.length)];
                attachment = new Discord.MessageAttachment('./slap/' + chosenFile);
                client.channels.cache.get(msg.channel.id).send(attachment);
                break;
            case 'pornpics':
                if (msg.channel.id === pornChannel) {
                    const picsSource = `https://www.pornpics.com/?q=${args[1]}+${args[2] === undefined ? ' ' : args[2]}`;
                    client.channels.cache.get(msg.channel.id).send(picsSource)
                } else {
                    client.channels.cache.get(msg.channel.id).send('Ne ebbe a channelbe írd');
                }
                break;
            case 'porn':
                let pornChoice = msg.content.slice(7 + args[1].length);
                let Searcher;
                if (msg.channel.id === pornChannel) {
                    switch (nickname.toLowerCase()) {
                        case 'xvideos':
                            Searcher = new PornSearch(pornChoice, nickname);
                            Searcher.videos()
                                .then(videos => {
                                    let random = Math.floor(Math.random() * videos.length);
                                    client.channels.cache.get(msg.channel.id).send(videos[random].url);
                                }).catch(err => {
                                client.channels.cache.get(msg.channel.id).send('Nincs találat');
                                console.log('nothing found');
                            });
                            return;
                        case 'sex':
                            Searcher = new PornSearch(pornChoice, nickname);
                            break;
                        case 'pornhub':
                            Searcher = new PornSearch(pornChoice, nickname);
                            break;
                        default:
                            Searcher = new PornSearch(pornChoice, nickname = 'pornhub');
                            break;
                    }
                    Searcher.gifs()
                        .then(gifs => {
                            let random = Math.floor(Math.random() * gifs.length);
                            nickname === 'sex' ? client.channels.cache.get(msg.channel.id).send(gifs[random].url) : client.channels.cache.get(msg.channel.id).send(gifs[random].webm);
                            client.channels.cache.get(msg.channel.id).send(gifs[random].title);
                        }).catch(err => {
                        client.channels.cache.get(msg.channel.id).send('Nincs találat');
                        console.log('nothing found');
                    });
              }else{
                    client.channels.cache.get(msg.channel.id).send('Ne ebbe a channelbe írd');
                }
                break;
            case '!help':
                msg.author.send('Szoszi \nAlábbi parancsokkal rendelkezem: \n' +
                    '!porn + "tematika": Küldök egy pornó képet a channelre, olyan témában amit a "tematika" helyett írsz be " jelek nélkül (csak 18+ channelre használd). \n' +
                    '!votemute "tag": (tag helyére tageld meg akit muteolni akarsz 30 sec-re aposztrófok nélkül), meg kell szavazni, 3 szavazat után érvényes. Admint, és botot nem muteolhatsz! \n' +
                    '!votenick "nicknév" "tag: nicknév helyére beírod a kívánt nevet, és tageled akinek a nevét meg akarod változtatni, ehhez 6 szavazat kell, hogy sikeres legyen. \n' +
                    '!kivagy + "tag" megmondja hogy te ki is vagy valójában. \nTovábbá sok káromkodás esetén jelzek hogy ne tedd. \n' +
                    '!kezelhetetlen: ha valaki rosszul viselkedik, helyre teszem egy pofon giffel.\n' +
                    '!praise + "emote" vagy "szöveg": isteni magaslatba emelem azt amit megadtál\n' +
                    '!csicskawall: kilistázom a csicska tanárokat\n' +
                    '!aranywall: kilistázom aranyember tanárokat\n' +
                    '!istenwall: meg mondom ki az isten\n' +
                    '!geci + "valami": meg dingi-dongizom\n' +
                    '!mock + "valami": retard spongyabobként beszélek\n' +
                    '!lotto "szám" "szám": a lottowo channelen tippelhetsz meg 2db 1 jegyű egész számot, és ha a sorsoláson a tiedet húzom, akkor nyersz :)\n' +
                    '!tippek: kilistázza milyen tippek voltak eddig\n' +
                    'Ha elkezded a bohen rapsody vagy a never gonna give you up egy részletét, akkor folytatom azt, így együtt tudunk dalolászni (fontos, hogy pontos legyen aposztróf szükséges, hogy jó helyen legyen)\n' +
                    '"no bully" a szövegben azt eredményezi hogy egy stop képet küldök, az abuse megszüntetésére. \n' +
                    'Furrykról szóló tartalomhoz szívesen becsatlakozok én is beszélgetni. \nIlletve "megcsap" vagy "paskol" szövegrészekre is reagálok ha a mondandódban van. \nVégül ha ' +
                    'valamit 3-an beküldenek a channelre egymás után, akkor én is beszállok és megismétlem. \nTájékoztatót "!!help"-el kérhetsz, de ezt már úgy is tudod.');
                break;
            case 'kivagy':
                member = msg.mentions.users.first();

                if (member.id === '518823389008232460' || member.id === '602525564217327637' || member.id === '623899095224025088' || member.id ==='491660100990140436') {
                    attachment = new Discord.MessageAttachment('./szerb/szerb_1.jpg');
                }
                else if (member.id === '376439826549047296'){
                    attachment = new Discord.MessageAttachment('./szerb/TAP.png');
                }else {
                    attachment = new Discord.MessageAttachment('./szerb/szerb_0.jpg');
                }

                client.channels.cache.get(msg.channel.id).send(attachment);
                break;
            case 'csicskawall':
                client.channels.cache.get(msg.channel.id).send(
                    '┌───── •✧Wall Of Csicska✧• ─────┐\n' +
                    '      Bánhelyi Balázs\n' +
                    '      ***C*** ***s*** ***e*** ***n*** ***d*** ***e*** ***s*** ***T*** ***i*** ***b*** ***o*** ***r***\n' +
                    '      Csókás Eszter\n' +
                    '      Gazdag-Tóth Boglárka Dr.\n' +
                    '      **Gingl Zoltán**\n' +
                    '      Hirling Dominik\n' +
                    '      **Kulin Julia**\n' +
                    '      Márkus András\n' +
                    '      Pletl Szilveszter Dr.\n' +
                    '      Pluhár András\n' +
                    '      London András\n' +
                    '      Vida Ágnes\n' +
                    '└───── •✧✧✧✧✧✧✧✧✧✧• ─────┘');
                break;
            case 'aranywall':
                client.channels.cache.get(msg.channel.id).send(
                    '┌──── •✧Wall Of Aranyember✧• ────┐\n' +
                    '      Antal Gábor\n' +
                    '      Balogh András\n' +
                    '      Cservenák Bence\n' +
                    '      Gazdag Zsolt\n' +
                    '      Győrffy Lajos\n' +
                    '      Heinc Emília\n' +
                    '      Kátai Kamilla\n' +
                    '      Kardos Péter\n' +
                    '      Kardos Péter Dr.\n' +
                    '      Farkas Richárd\n' +
                    '      Fülöp Vanda\n' +
                    '      Keleti Márton\n' +
                    '      Kicsi András\n' +
                    '      Kunos Ádám\n' +
                    '      ***Maróti Miklós***\n' +
                    '      Szabó Tamás\n' +
                    '      Szabolcs Iván\n' +
                    '└───── •✧✧✧✧✧✧✧✧✧• ─────┘');
                break;
            case 'aranyember':
                let asciiEnd = '```';
                client.channels.cache.get(msg.channel.id).send(asciiEnd +
                    '               )\\         O_._._._A_._._._O         /(\n' +
                    '                \\`--.___,\'=================`.___,--\'/\n' +
                    '                 \\`--._.__                 __._,--\'/\n' +
                    '                   \\  ,. l`~~~~~~~~~~~~~~~\'l ,.  /\n' +
                    '       __            \\||(_)!_!_!_.-._!_!_!(_)||/            __\n' +
                    '       \\\\`-.__        ||_|____!!_|;|_!!____|_||        __,-\'//\n' +
                    '        \\\\    `==---=\'-----------\'=\'-----------`=---==\'    //\n' +
                    '        | `--.               Maróti Miklós             ,--\' |\n' +
                    '         \\  ,.`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\',.  /\n' +
                    '           \\||  ____,-------._,-------._,-------.____  ||/\n' +
                    '            ||\\|___!`======="!`======="!`======="!___|/||\n' +
                    '            || |---||--------||-| | |-!!--------||---| ||\n' +
                    '  __O_____O_ll_lO_____O_____O|| |\'|\'| ||O_____O_____Ol_ll_O_____O__\n' +
                    '  o H o o H o o H o o H o o |-----------| o o H o o H o o H o o H o\n' +
                    ' ___H_____H_____H_____H____O =========== O____H_____H_____H_____H___\n' +
                    '                          /|=============|\\\n' +
                    '()______()______()______() \'==== +-+ ====\' ()______()______()______()\n' +
                    '||{_}{_}||{_}{_}||{_}{_}/| ===== |_| ===== |\\{_}{_}||{_}{_}||{_}{_}||\n' +
                    '||      ||      ||     / |==== s(   )s ====| \\     ||      ||      ||\n' +
                    '======================()  =================  ()======================\n' +
                    '----------------------/| ------------------- |\\----------------------\n' +
                    '                     / |---------------------| \\\n' +
                    '-\'--\'--\'           ()  \'---------------------\'  ()\n' +
                    '                   /| ------------------------- |\\    --\'--\'--\'\n' +
                    '       --\'--\'     / |---------------------------| \\    \'--\'\n' +
                    '                ()  |___________________________|  ()           \'--\'-\n' +
                    '  --\'-          /| _______________________________  |\\\n' +
                    ' --\' gpyy      / |__________________________________| \\      \n' + asciiEnd);
                break;
            case 'istenwall':
                client.channels.cache.get(msg.channel.id).send(istenEmbed);
                break;
            case 'geci':
                await msg.delete();
                client.channels.cache.get(msg.channel.id).send('oh igen' + sentence);
                client.channels.cache.get(msg.channel.id).send('<a:yourmom:787410945541537842>');
                break;
            case 'mock':
                await msg.delete();
                let retardSentence = func.reardinator(sentence);
                client.channels.cache.get(msg.channel.id).send('<a:retard:788703547335901184>');
                client.channels.cache.get(msg.channel.id).send(retardSentence);
                client.channels.cache.get(msg.channel.id).send('<a:retard:788703547335901184>');
                break;
            case 'lotto':
                if (msg.channel.id === '779395227688501298') {
                    member = msg.author.username;
                    let tips = `${args[1]} ${args[2]}`;
                    if (`${args[1]} ${args[2]}` === 'kurva anyád') {
                        client.channels.cache.get(msg.channel.id).send('Flote egy barom');
                        return;
                    }
                    if (!isNaN(parseInt(args[1])) && !isNaN(parseInt(args[2]))) {
                        if (args[3] === 'change'){
                            await database.updateLottoTip(member, msg.author.id, tips);
                            client.channels.cache.get(msg.channel.id).send(`Tipped mentve: ${args[1]} ${args[2]}`);
                        } else if (args[3] === undefined) {
                            let exist = await database.getLotto(msg.author.id);
                            if (exist !== null) {
                                client.channels.cache.get(msg.channel.id).send('Te már tippeltél, tippet a beírt számok után való "change" szöveggel módosíthatsz');
                            } else {
                                await database.createLottoTip(member, msg.author.id, tips);
                                client.channels.cache.get(msg.channel.id).send(`Tipped mentve: ${args[1]} ${args[2]}`);
                            }
                        } else {
                            client.channels.cache.get(msg.channel.id).send('2 egész egyjegyű számot adj meg');
                        }
                    } else {
                        client.channels.cache.get(msg.channel.id).send('2 egész egyjegyű számmal tippelj');
                    }

                } else {
                    client.channels.cache.get(msg.channel.id).send('Itt nem tippelhetsz');
                }
                break;
            case 'tippek':
                if (msg.channel.id === '779395227688501298') {
                let checkNumbers = await func.setLottoNumbers();
                client.channels.cache.get(msg.channel.id).send(checkNumbers);
                } else {
                    client.channels.cache.get(msg.channel.id).send('no');
                }
                break;
            case 'hess':
                attachment = new Discord.MessageAttachment('./szerb/hess.gif');
                client.channels.cache.get(msg.channel.id).send(attachment);
                break;
            case 'votemute':
                await msg.react('👍');

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

                await msg.react('👍');

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

    if (msg.channel.id === '796405215279972353') {
        if (msg.content.substring(0, 1) === '?') {
            switch (cmd.toLocaleLowerCase()) {
                case 'create':
                    if (args[1] === undefined || args[2] === undefined) {
                        client.channels.cache.get(msg.channel.id).send('Adj meg nevet és fajt is');
                        return;
                    }
                    let description = msg.content.slice(10 + args[1].length + args[2].length);
                    let exist = await func.getCharacter(msg.author.id);
                    if (exist !== null) {
                        client.channels.cache.get(msg.channel.id).send('Neked már létezik karaktered');
                    } else {
                        if (func.raceCheck(args[2]) !== false) {
                            let stats = func.getRaceStats(args[2].toLowerCase());
                            database.characterCreate(args[1], args[2], description, msg.author.id, stats[0], stats[1], stats[2], stats[3]);
                            client.channels.cache.get(msg.channel.id).send('Karakter létrehozva');
                        } else {
                            client.channels.cache.get(msg.channel.id).send('Választható fajt adj meg légyszi\n Fajok listáját ezzel találod: ?races');
                        }
                    }
                    break;
                case 'char':
                    await checkCharacter();
                    break;
                case 'levelup':
                    if (args[1] === undefined) {
                        client.channels.cache.get(msg.channel.id).send('Add meg mire akarsz talentolni');
                        return;
                    }
                    const myChar = await func.getCharacter(msg.author.id);
                    if (myChar.talent > 0 && func.getStats(args[1])) {
                        client.channels.cache.get(msg.channel.id).send(`${myChar.name}, egy talent pontot elhasználtál, maradt: ${myChar.talent}`);
                        await database.addTalentCharacter(myChar, args[1].toLowerCase());
                    } else {
                        client.channels.cache.get(msg.channel.id).send('Neked nincs talent pontod, elősször szintet kell, hogy lépj');
                    }
                    break;
                case 'races':
                    let races = func.getRaceList();
                    client.channels.cache.get(msg.channel.id).send(races);
                    break;
                case 'adventures':
                    let adventures = func.getAdventures();
                    client.channels.cache.get(msg.channel.id).send(adventures);
                    break;
                case 'adventure':
                    if (args[1] === undefined) {
                        client.channels.cache.get(msg.channel.id).send('Adj meg nehézséget');
                        return;
                    }
                    if (func.adventureCheck(args[1])) {
                        client.channels.cache.get(msg.channel.id).send('Adj meg nehézséget');
                        return;
                    }
                    let difficult = args[1];
                    let hero = await checkCharacter();
                    let monster = await checkEnemy(difficult);
                    let wins = [];
                    wins = func.fightMonster(monster, hero);
                    console.log(wins);
                    client.channels.cache.get(msg.channel.id).send(`${hero.name}: ${wins[1]} Vs ${monster.name}: ${wins[2]}.`);
                    if (wins[0] === 'hero') {
                        client.channels.cache.get(msg.channel.id).send(`Gratulálok ${hero.name} elintézted ${monster.name}-t. Jutalmad ${monster.experience}xp!`);
                        let newXp = hero.experience + monster.experience;
                        let levelled = func.checkLevels(hero.level, newXp);
                        if (levelled !== 0){
                            await database.levelUpCharacter(hero, levelled);
                            client.channels.cache.get(msg.channel.id).send(`<:pogger:780724037331845151> Juhúú ${hero.name} szintet léptél! Jutalmad 1db Talent pont! ?levelup paranccsal oszd ki a talentedet.`);
                        } else {
                            await database.updateCharacter(hero, monster.experience);
                        }
                    } else {
                        client.channels.cache.get(msg.channel.id).send(`${monster.name} most jól agyonvert <a:bonkgif:780722290945294356>. Visszatértél a város gyengélkedőjére.`);
                    }
                    break;
            }
        }
    }

    async function checkEnemy(difficult) {
        const enemy = await func.getEnemy(difficult);
        const enemyChar = new Discord.MessageEmbed()
            .setColor('#ff0202')
            .setTitle(`[${enemy.name}] lvl: ${enemy.level}`)
            .setThumbnail(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcg2z-7M1BLuu4WbVKYQzv8Ya30gb5-b5n4Q&usqp=CAU`)
            .setAuthor(`Monster`)
            .addField('Race: ',
                `${enemy.race}`)
            .addField('Description: ',
                `*${enemy.description}*`)
            .addField('Stats: ',
                `Power: ${enemy.Power}\n` +
                `Intellect: ${enemy.Intellect}\n` +
                `Agility: ${enemy.Agility}`)
            .addField('Experience: ',
                `${enemy.experience}xp`)
            .addField('Difficult: ',
                `${enemy.diff}`);
        client.channels.cache.get(msg.channel.id).send(enemyChar);
        return enemy;
    }

    async function checkCharacter() {
        const myChar = await func.getCharacter(msg.author.id);
        const emberChar = new Discord.MessageEmbed()
            .setColor('#36ff00')
            .setTitle(`[${myChar.name}] LvL: ${myChar.level}`)
            .setThumbnail(`${msg.author.avatarURL()}`)
            .setAuthor(`${msg.author.username}`)
            .addField('Race: ',
                `${myChar.race}`)
            .addField('Description: ',
                `*${myChar.description}*`)
            .addField('Stats: ',
                `Power: ${myChar.Power}\n` +
                `Intellect: ${myChar.Intellect}\n` +
                `Agility: ${myChar.Agility}\n` +
                `Luck: ${myChar.Luck}`)
            .addField('Experience: ',
            `${myChar.experience}xp, Elérhető talent: ${myChar.talent}`);
        client.channels.cache.get(msg.channel.id).send(emberChar);
        return myChar;
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

    if (msg.content.substring(0, 1) === '.' && (msg.channel.id === '704983142452428933' || msg.channel.id === '786140249809354793')) {
        let args = msg.content.substring(1).split(' ');
        let cmd = args[0];
        let channel = args[1];

        let channelId = func.getChannel(channel);
        await msg.delete();
        let sentence = msg.content.slice(5);
        switch (cmd.toLocaleLowerCase()) {
            case 'help':
                client.channels.cache.get(msg.channel.id).send('Elérhető kommandok:\n ".say" + "channel név" + "szöveg" -> az adott channel-re a szöveget kiírja\n' +
                'elérhető channelek: "suwuli", "owoff (ezt nem kötelező kiírni)", "kuwuka", "18", "mowozi", "jatekowos", "altalanowos", "lotto"\n' +
                '.sup <:surp:708969952354500658>\n.tri <:trigger:708979797895938168>\n.cute <:cute:735574079851200582>\n' +
                    '.on_no <:oh_no:735574451088785498>\n.gimme <:gimme:744540992430145586>\n.simp <:simp:744540966215483442>\n' +
                    '.burn <:burn:744540895478808626>\n.ew <:ew:744540932967235674>\n.nameselj <:marotihaha:759804122139983873>\n' +
                    '.hmm <:pepehmm:780723259355824128>\n.dayum <:dayum:785148917326675998>\n.fuck <a:yourmom:787410945541537842>\n' +
                    '.kikerdezte <a:whoasked:719267371029889168>');
                break;
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
                break;
            case 'hmm':
                client.channels.cache.get(channelId).send('<:pepehmm:780723259355824128>');
                break;
            case 'dayum':
                client.channels.cache.get(channelId).send('<:dayum:785148917326675998>');
                break;
            case 'fuck':
                client.channels.cache.get(channelId).send('<a:yourmom:787410945541537842>');
                break;
            case 'kikerdezte':
                client.channels.cache.get(channelId).send('<a:whoasked:719267371029889168>');
                break;
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

    if (msg.content.toLowerCase() === '<:medishrug:788463541107163137>') {
        client.channels.cache.get(msg.channel.id).send('<:madishrug:788328467485032458>');
    } else if (msg.content.toLowerCase() === '<:madishrug:788463507082575893>') {
        client.channels.cache.get(msg.channel.id).send('<:medishrug:788328451550871552>');
    }

    if (msg.content.toLowerCase().includes('no bully')) {
        client.channels.cache.get(msg.channel.id).send('https://i.pinimg.com/originals/78/e3/6c/78e36c8c096aeb13b46a3b41cd934c9f.jpg');
    }

    if (msg.content.toLowerCase().includes('maróti') || msg.content.toLowerCase().includes('dimat') || msg.content.toLowerCase().includes('maroti') || msg.content.toLowerCase().includes('aranyember')) {
        await msg.react('759804122139983873');
    }

    if (msg.content.toLowerCase().includes('brc')) {
        await msg.react('767665863649787924');
    }

    if (msg.content.toLowerCase().includes('megcsap') || msg.content.toLowerCase().includes('paskol')) {
        client.channels.cache.get(msg.channel.id).send('<a:uwu_flotespanking:677984852963885075>');
    }

    /*if (func.swearListCheck(msg.content)) {
        swearStack++;
        let textArray = ['hagyd abba', 'Ne beszélj már csúnyán', 'Kell a baj?', 'Mit káromkodsz?', 'Moderáljad már magad', 'Szépen meg ki fog beszélni?', 'Kőban?', 'ffs'];
        let randomNumber = Math.floor(Math.random() * textArray.length);
        if (swearStack === 10) {
            client.channels.cache.get(msg.channel.id).send(textArray[randomNumber]);
            swearStack = 0;
        }
    }*/

    if (msg.content.toLocaleLowerCase() === 'beírta?' ||
    msg.content.toLocaleLowerCase() === 'beírtamá?' ||
    msg.content.toLocaleLowerCase() === 'beírta már?' ||
    msg.content.toLocaleLowerCase() === 'mikor írja be?' ||
    msg.content.toLocaleLowerCase() === 'mikor írja be'||
        msg.content.toLocaleLowerCase() === 'beirta?' ||
        msg.content.toLocaleLowerCase() === 'beirtamá?' ||
        msg.content.toLocaleLowerCase() === 'beirta már?' ||
        msg.content.toLocaleLowerCase() === 'mikor irja be?' ||
        msg.content.toLocaleLowerCase() === 'mikor irja be') {
        let furryArray = ['soha', 'úgyse fogja', 'csitt', 'engedd el', '(puskázás)', 'Tanultál volna'];
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
        let randomNumber = Math.floor(Math.random() * 5);
        if (randomNumber === 4) {
            client.channels.cache.get(msg.channel.id).send('"k" legalább csináld rendesen');
        }
    }

    try {
        if (msg.mentions.members.first().user.username === 'Pearly') {
            client.channels.cache.get(msg.channel.id).send('Szeretnél valamit?');
        }
    }catch (e) {

    }
});

client.on('messageDelete', message => {
    let channel = message.channel;
    let messagePic = '';
    let messageContent = '*none*';
    if (message.cleanContent !== null) {
        if (message.cleanContent.length > 0) {
            messageContent = message.cleanContent;
        }
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
client.login('NjgzNzAyNzgyODk2NzY3MDE2.XlvZ1g.pD5CXOTEyBkiA0G-L_jMRAlPVbo');


function voteMuteFilter(reaction, user) {
    if (['👍'].includes(reaction.emoji.name)) {
        if (!voters.includes(user.id)) {
            voters.push(user.id);
            console.log('pushed');
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
            console.log('pushed');
        }
    }
    if (voters.length === 5) {
        voters = [];
        return true;
    }
}
//Zsolf,zsolf57@gmail.com
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
