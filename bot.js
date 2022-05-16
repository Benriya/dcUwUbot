import hsp from 'heroku-self-ping';
hsp.default("https://discord8w8bot.herokuapp.com");

import dotenv from 'dotenv'
dotenv.config();

import http from 'http';
import {song} from './songs.js';
import func from './functions.js';
import Discord, {MessageAttachment} from 'discord.js';
import database from './database/handle_database.js';
import fs from 'fs';
import { Errors } from './Throws/errors.js';
import Pagination from 'discord-paginationembed';
import {Hero} from "./dungenowos/Hero.js";
import {Monster} from "./dungenowos/Monster.js";
import {Chest} from "./dungenowos/chest.js";
import {getChart, getForecast} from "./weather.js"

const question = JSON.parse(fs.readFileSync('./dungenowos/fight.json', 'utf8'));
const statList = ['strength', 'intellect', 'agility', 'luck', 'maxhp', 'regen', 'defense']
const adventureList = ['critter', 'weak', 'easy', 'normal', 'hard'];
//'expert', 'deathwish', 'usurper', 'mythical', 'godlike'
const chestList = ['minor', 'small', 'normal', 'big', 'huge', 'gorgeous', 'giant', 'colossus', 'god'];
const dzsitParticipants = ['<@251831600512368641>', '<@491660100990140436>', '<@518823389008232460>',
                        '<@602525564217327637>', '<@279565175588388865>', '<@623899095224025088>',
                        '<@310497849274007553>', '<@295485347138240513>'];
const dzsittChannels = ['671309309757358123', '667783025811259448', '839885997923237889', '706776570836156426'];
const noSpamChannels = ['813842740210958446', '841654691225010206', '846424723131072530', '902900685417373737'];
const listCheck = ['Kys', 'Flote kussolj', 'Jo reggelt faszom', 'Szakdoge mizu', 'Zv mizu', 'Swarci old', 'Geci szerb', 'Nem dolgoztam ma', 'Flote mosogatógép szerelő'];
let voters = [];
const memes = { texas: {x:500, y:600, color:'#000000', Cx: 185, Cy: 70, stroke: '#ffffff',
                        font: '25px sans-serif', link:'memes/texas.jpeg', special: true},
                peter: {x:600, y:500, color:'#ffffff', Cx: 150, Cy: 230, stroke: '#000000',
                        font: '25px sans-serif', link:'memes/peter.png', special: false}
                }
let pinger, HUF;
const deleteChannelId = '740536932303634473';
const weatherChannelId = '884880382095421550';

const PORT = process.env.PORT || 4040;
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Default view');
});
server.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

setInterval(async () => {
    let nowDate = new Date();

    if (nowDate.getMinutes() === 0 && nowDate.getHours() === 6) {
        const listEmbed = await func.sendList();
        func.toDiscordMessageChannel(client, '671309309757358123', listEmbed);
        await getForecast(function(weather, rain) {
            func.toDiscordMessageChannel(client, weatherChannelId,
                'Mai napi időjárás jelentésünk következik Szegedről:\n' + weather);
            if (rain === true) {
                func.toDiscordMessageChannel(client, weatherChannelId,
                    '**Mai nap folyamán eső várható**');
            }
        });
        await getChart(function (chartUrl) {
            func.toDiscordMessageChannel(client, weatherChannelId,`Chart: ${chartUrl}`);
        });
        await database.resetList();
    }

    if (func.rollTheDice(2) && nowDate.getMinutes() === 0) {
        let channelNum = func.drawOne(dzsittChannels);
        let participant = func.drawOne(dzsitParticipants);
        func.toDiscordMessageChannel(client, dzsittChannels[channelNum],'Dzsitt ' + dzsitParticipants[participant] + ' <:friedlaugh:886329158198759495>');
    }

    if (nowDate.getMinutes() === 0) {
        const exchange = await func.requestEur();
        const index = exchange.indexOf('rate');
        HUF = exchange.slice(index + 7, index + 13);
    }

},60 * 1000);

client.on('message', async msg => {
    if (msg === undefined) return;
    await client.user.setActivity(`1 Euro = ${HUF} Ft`);
    if (msg.author.bot) return;

    let author = msg.author.id;
    let messageChannel = msg.channel.id;
    let firstMention = msg.mentions.members.first();
    let error = new Errors();
    let args = msg.content.substring(1).split(' ');
    let cmd = args[0];
    let attachment = (msg.attachments).array();

    if (msg.attachments.size > 0) {
        func.toDiscordMessageChannel(client, '745317754256490567', `${attachment[0].proxyURL} id: ${attachment[0].id}`);
    }

    if (noSpamChannels.includes(messageChannel) && msg.attachments.size === 0) {
        await msg.delete();
        return;
    }
    /***
     *  TODO kivinni functionsbe
     */
    msg.channel.messages.fetch({limit: 1}).then(async message => {
        const msgContent = message.first().content;
        for (let expected in listCheck) {
            if (func.isSimilar(msgContent, listCheck[expected]) >= 0.5) {
                await database.updateList(listCheck[expected]);
            }
        }
    })
    /***
     *  TODO kivinni functionsbe
     */
    msg.channel.messages.fetch({limit: 3}).then(messages => {
        let lastMessage = messages.first();
        let lastMessages = messages.array();

        if (!lastMessage.author.bot) {
            if (func.checkIfSame(lastMessages)){
                func.toDiscordMessage(client, msg, lastMessage.content);
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

        console.log(Date() + ": " + cmd.toLocaleLowerCase());

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
            case 'mem':
                let memeName;
                if (func.isSimilar(nickname, 'texas') > 0.6) {
                    memeName = memes.texas;
                } else if (func.isSimilar(nickname, 'peter') > 0.6) {
                    memeName = memes.peter;
                } else {
                    func.toDiscordMessage(client, msg,error.noSuchMeme());
                    return
                }
                sentence = sentence.replace(nickname, '');
                const picture = func.memeChoose(sentence, memeName);

                const attachment = new MessageAttachment(await picture, 'memes/profile-image.png');

                func.sendAttachment(attachment.attachment, client, msg);
                break;
            case 'praise':
                func.toDiscordMessage(client, msg, nickname + '<:head:767421798786138154>\n' + '<:hand:767421873360601168>' + '<:face:767421929366749184>');
                break;
            case 'kurai':
                await msg.delete();
                func.toDiscordMessage(client, msg, func.randomLongMessage(['A', 'S', 'D', '?', ':', '\_'], Math.floor(Math.random() * 50 + 20)));
                break;
            case 'amecu':
            case 'ametsu':
                await msg.delete();
                func.toDiscordMessage(client, msg, func.randomLongMessage(['<:monkayay:806119728359145512>', '<:harold:806119762764496949>', '<:sadcat:806119685145231391>'], Math.floor(Math.random() * 10 + 3)));
                break;
            case 'vonzalom':
                await msg.delete();
                func.toDiscordMessage(client, msg, func.randomLongMessage(['<:monkayay:806119728359145512>', '<:catblep:897797757539061780>', '<:kappa:897797802745270302>'], Math.floor(Math.random() * 10 + 3)));
                break;
            case 'hess':
                func.sendAttachment('./szerb/hess.gif', client, msg);
                break;
            case 'akurva':
                func.sendAttachment('./szerb/akurva.mp4', client, msg);
                break;
            case 'rule':
                func.sendAttachment('./rule.png', client, msg);
                break;
            case 'hirling':
                func.sendAttachment('./szerb/hirling.png', client, msg);
                break;
            case 'faszom':
                func.sendAttachment('./szerb/picsaba.png', client, msg);
                break;
            case 'micsinalsz':
                func.sendAttachment('./szerb/micsinalsz.png', client, msg);
                break;
            case 'csokas':
                func.sendAttachment('./szerb/csokas.png', client, msg);
                func.sendAttachment('./szerb/fasszopokas.png', client, msg);
                break;
            case 'monke':
                func.sendAttachment('./szerb/monke.png', client, msg);
                break;
            case 'ugood':
                func.sendAttachment('./szerb/ugood.jpg', client, msg);
                break;
            case 'vicci':
                func.sendAttachment('./szerb/vicci.jpg', client, msg);
                break;
            case 'gay':
                func.sendAttachment('./szerb/gay.jpg', client, msg);
                break;
            case 'szepi':
            case 'pisti':
            case 'inevitable':
                func.sendAttachment('./szerb/inevitable.png', client, msg);
                break;
            case 'alma':
                func.sendAttachment('./szerb/alma.png', client, msg);
                break;
            case 'bullshit':
                func.sendAttachment('./szerb/bullshit.mp4', client, msg);
                break;
            case 'punch':
                func.sendAttachment('./szerb/punch.mov', client, msg);
                break;
            case 'uwu':
                func.sendAttachment('./szerb/uwu.gif', client, msg);
                if (args[1] !== undefined && args[1] === "assemble") {
                    func.sendAttachment('./szerb/assemble.gif', client, msg);
                }
                break;
            case 'assemble':
                func.sendAttachment('./szerb/assemble.gif', client, msg);
                break;
            case 'uncool':
                func.sendAttachment('./szerb/uncool.mp4', client, msg);
                break;
            case 'kurva':
                func.sendAttachment('./szerb/kurvaaaa.mp3', client, msg);
                break;
            case 'kussoljmár':
                func.sendAttachment('./szerb/kussoljmar.mp3', client, msg);
                break;
            case 'springboot':
                func.sendAttachment('./szerb/springbooooot.mp4', client, msg);
                break;
            case 'medikiakad':
                func.sendAttachment('./szerb/medimadi.mp4', client, msg);
                break;
            case 'bully':
                func.sendAttachment('./szerb/bully.gif', client, msg);
                break;
            case 'nemtudom':
                await msg.delete();
                func.sendAttachment('./szerb/nemtudom.png', client, msg);
                break;
            case 'list':
                await msg.delete();
                const listEmbed = await func.sendList();
                func.toDiscordMessage(client, msg, listEmbed);
                break;
            case 'kezelhetetlen':
                let files = fs.readdirSync('./slap');
                let chosenFile = files[Math.floor(Math.random() * files.length)];
                func.sendAttachment('./slap/' + chosenFile, client, msg);
                break;
            case 'porn':
                if (messageChannel === pornChannel) {
                    func.toDiscordMessage(client, msg, 'Sry, átdolgozás alatt...');
                }
                break;
            case '!help':
                let commands = func.getCommands();
                let FieldsEmbed = new Pagination.FieldsEmbed()
                .setArray(commands)
                .setAuthorizedUsers([msg.author.id])
                .setChannel(msg.channel)
                .setElementsPerPage(1)
                .setPage(1)
                .setPageIndicator(true)
                .formatField('Parancsok', i => i.Parancsok)
                .setTimeout(600000000)
                .setDeleteOnTimeout(false)
                .setFunctionEmojis({
                    '🔄': (user, instance) => {
                        const field = instance.embed.fields[0];

                        if (field.name === 'Parancsok')
                            field.name = 'Ninja egy fasszopó, Kuba meg a fasz';
                        else
                            field.name = 'Parancsok';
                    }
                })
                .setEmojisFunctionAfterNavigation(false);

                FieldsEmbed.embed
                    .setColor(0xFF00AE)
                    .setDescription('Nesztek itt vannak a parancsok pupákok');

                await FieldsEmbed.build();
                func.toDiscordMessage(client, msg, {embeds: [FieldsEmbed]});
                break;
            case 'kivagy':
                let image;

                if (firstMention.id === '518823389008232460' || firstMention.id === '602525564217327637' || firstMention.id === '623899095224025088' || firstMention.id ==='491660100990140436') {
                    image = './szerb/szerb_1.jpg';
                }
                else if (firstMention.id === '376439826549047296'){
                    image = './szerb/TAP.png';
                }else {
                    image = './szerb/szerb_0.jpg';
                }
                func.sendAttachment(image, client, msg);
                break;
            case 'csicskawall':
                let csicskawall = func.getCsicskawall();
                func.toDiscordMessage(client, msg, csicskawall);
                break;
            case 'aranywall':
                let aranywall = func.getAranywall();
                func.toDiscordMessage(client, msg, aranywall);
                break;
            case 'geci':
                await msg.delete();
                func.toDiscordMessage(client, msg, 'oh igen' + sentence);
                func.toDiscordMessage(client, msg, '<a:yourmom:787410945541537842>');
                break;
            case 'mock':
                await msg.delete();
                func.toDiscordMessage(client, msg, '<a:retard:788703547335901184>');
                func.toDiscordMessage(client, msg, func.retardinator(sentence));
                func.toDiscordMessage(client, msg, '<a:retard:788703547335901184>');
                break;
            case 'votemute':
                await msg.react('👍');
                msg.awaitReactions(voteMuteFilter, { max: 1, time: 10000, errors: ['time']})
                    .then(async () => {
                        let mute_role = msg.guild.roles.cache.get("686288799109480523");
                        await firstMention.roles.add(mute_role);
                        await func.toDiscordMessage(client, msg, 'Muteolva');
                        setTimeout(() => {firstMention.roles.remove(mute_role);
                        }, 30 * 1000);
                    }).catch(r => {
                    func.toDiscordMessage(client, msg, error.deniedVote());
                            console.log(r);
                        });
                break;
            case 'votenick':
                try{
                    if (firstMention.roles.cache.has('671107459858956299')) {
                        func.toDiscordMessage(client, msg,'Botot nem nevezhetsz át');
                        break;
                    }
                } catch (err){
                    console.log('error');
                }
                await msg.react('👍');
                msg.awaitReactions(voteNickFilter, { max: 1, time: 30000, errors: ['time']})
                    .then( () => {
                        firstMention.setNickname(nickname, 'Sikeres Szavazás');
                        func.toDiscordMessage(client, msg,'Sikeres átnevezés: ' + firstMention.user.username);
                    }).catch(r => {
                    func.toDiscordMessage(client, msg, error.deniedVote());
                    console.log(r);
                });
                break;
            case 'sub':
                pinger = await func.checkIfPingerSub(nickname, author);
                if (nickname !== undefined && !pinger) {
                        database.subscribeForPing(nickname, author);
                        func.toDiscordMessage(client, msg, 'Feliratkozál teszt pingre: ' + nickname);
                }
                break;
            case 'unsub':
                pinger = await func.checkIfPingerSub(nickname, author);
                if (nickname !== undefined && pinger) {
                        database.unsubscribeForPing(nickname, author);
                        func.toDiscordMessage(client, msg, 'Leiratkoztál teszt pingről: ' + nickname);
                }
                break;
            case 'come':
                pinger = await func.checkIfPingerSub(nickname, author);
                if (nickname !== undefined && pinger) {
                        let pings = await func.getPingUsers(nickname);
                        func.toDiscordMessage(client, msg, pings);
                }
                break;
            case 'risus':
                await msg.delete();
                if (author === '310497849274007553'|| author === '318072258465628161' || author === '602525564217327637') { //Dawe24 || Kuroko || Kruzor57
                    func.toDiscordMessage(client, msg, `<:leave:839585675002642452> <#${func.getChannel(args[1])}>`);
                }
                break;
            case 'aztakurva':
                await msg.delete();
                func.toDiscordMessage(client, msg, "<:react:905522849014485093> 📢  🇦 🇿 🇹 🇦   🇰 🇺 🇷 🇻 🇦");

        }
    }
    /***
     *  TODO Jobbra
     */
    /*if(msg.attachments.size === 0) {
        if (song.toLowerCase().includes(msg.content.toLowerCase())) {
            const startSong = msg.content.toLowerCase();
            const lowerCase = song.toLowerCase();
            const splitSong = lowerCase.split('\n');
            for (let i = 0; i < splitSong.length; i++) {
                if (splitSong[i] === startSong) {
                    func.toDiscordMessage(client, msg, splitSong[i + 1]);
                    break;
                }
            }
        }
    }*/

//RPG-project
    if (messageChannel === '796405215279972353') {
        if (await func.getCharacter(author) === null && cmd.toLowerCase() !== 'create') {
            func.toDiscordMessage(client, msg, error.nonExistHero());
            return;
        }

        let hero = new Hero(await func.getCharacter(author));
        let username = msg.author.username;
        let heroEmbed, enemyEmbed, enemy, chest, chestType, rested, allHeroes;
        const webhooks = await client.channels.cache.get(messageChannel).fetchWebhooks();
        const webhook = webhooks.first();
        const adventureFilter = response => {
            if (response.author.id === author && response.content.toLowerCase().startsWith('?')) return true;
            return question[0].answers.some(answer => answer.toLowerCase() === response.content.toLowerCase()) && response.author.id === author;
        };

        if (msg.content.substring(0, 1) === '?') {
            switch (cmd.toLocaleLowerCase()) {
                case 'create':
                    if (args[1] === undefined || args[2] === undefined) {
                        func.toDiscordMessage(client, msg,error.badRaceOrName());
                        return;
                    }
                    let description = msg.content.slice(11 + args[1].length + args[2].length + args[3].length);
                    let exist = await func.getCharacter(author);
                    if (exist !== null) {
                        func.toDiscordMessage(client, msg,error.existHero());
                    } else {
                        if (func.raceCheck(args[2]) !== false) {
                            let stats = func.getRaceStats(args[2].toLowerCase());
                            database.characterCreate(args[1], args[2], args[3], description, author, stats[0], stats[1], stats[2], stats[3], stats[4], stats[5], stats[6], stats[7], stats[8]);
                            func.toDiscordMessage(client, msg, 'Karakter létrehozva');
                        } else {
                            func.toDiscordMessage(client, msg, error.badRaceGiven());
                        }
                    }
                    break;
                case 'pvp':
                    enemy = new Hero(await func.getCharacter(firstMention.id));
                    if (enemy === null) {
                        func.toDiscordMessage(client, msg, error.noResult());
                        return;
                    }
                    heroEmbed = hero.getHeroEmbed(username);
                    enemyEmbed = enemy.getHeroEmbed(firstMention.user.username);
                    await func.fightEmbed(heroEmbed, enemyEmbed, 'Harc a végsőkig', webhook);
                    hero.fightResult(client, msg, enemy, 'pvp', 'pvp');
                    break;
                case 'adventure':
                    if (args[1] === undefined || !func.checkArrayIncludes(args[1], adventureList)) {
                        func.toDiscordMessage(client, msg, error.noDifficultGiven());
                        return;
                    }
                    let difficult = args[1];
                    enemy = new Monster(await func.getEnemy(difficult));
                    heroEmbed = hero.getHeroEmbed(username);
                    enemyEmbed = enemy.getMonsterEmbed();
                    await func.fightEmbed(heroEmbed, enemyEmbed, difficult, webhook);

                    await chooseAttack();

                function chooseAttack() {
                    client.channels.cache.get(msg.channel.id).send(question[0].question).then(() => {
                        client.channels.cache.get(messageChannel).awaitMessages(adventureFilter, { max: 1, time: 30000, errors: ['time'] })
                            .then(collected => {
                                if (collected.first().content.startsWith('?')) {
                                    func.toDiscordMessage(client, msg,'Új csatát indítottál');
                                    hero.fleeHero();
                                    return;
                                }
                                func.toDiscordMessage(client, msg,`${hero.getHero().name} ${collected.first().content} támadást hajtott végre`);
                                if (collected.first().content === 'flee') {
                                    func.toDiscordMessage(client, msg,`${hero.getHero().name} elmenekült a csatától`);
                                    hero.fleeHero();
                                    return;
                                }
                                let result = hero.fightResult(client, msg, enemy, collected.first().content);
                                console.log(result);
                                if (result === 'done') return;
                                chooseAttack();
                            })
                            .catch(collected => {
                                console.log(collected);
                                func.toDiscordMessage(client, msg,'Lejárt az időd!');
                                hero.fleeHero();
                            });
                    });
                }
                    break;
                case 'rest':
                    rested = hero.rest();
                    func.toDiscordMessage(client, msg, rested);
                    break;
            }
        }

        if (msg.content.substring(0, 1) === '>') {
            switch (cmd.toLocaleLowerCase()) {
                case 'adventures':
                    func.toDiscordMessage(client, msg, func.getAdventures());
                    break;
                case 'races':
                    func.toDiscordMessage(client, msg, func.getRaceList());
                    break;
                case 'levelup':
                    if (args[1] === undefined) {
                        func.toDiscordMessage(client, msg, error.noStatGiven());
                        return;
                    }
                    if (hero.getHero().talent > 0 && func.checkArrayIncludes(args[1], statList)) {
                        func.toDiscordMessage(client, msg, `${hero.getHero().name}, egy talent pontot elhasználtál, maradt: ${hero.getHero().talent - 1}`);
                        hero.updateHeroPoint(args[1].toLowerCase(),1, 1);
                    } else {
                        func.toDiscordMessage(client, msg, error.noTalent());
                    }
                    break;
                case 'char':
                    func.toDiscordMessage(client, msg, hero.getHeroEmbed(username));
                    break;
                case 'heroes':
                    allHeroes = await func.getAllHero();
                    await func.sendAllHeroes(allHeroes, 'All heroes', webhook);
                    break;
                case 'halloffame':
                    func.toDiscordMessage(client, msg,
                        '┌───── •✧Wall Of Fame✧• ─────┐\n' +
                        '    1. NagyDorongúKanCigány, LvL: 33, race: Orc\n' +
                        '    2. Bélpoklos, LvL: 26, race: Lizard\n' +
                        '    3. GopsySlavRepairKing, LvL: 22, race: Troll\n' +
                        '    4. CyberFánk, LvL: 21, race: Elf\n' +
                        '    5. SkeleTram LvL: 12, Skeleton\n' +
                        '    6. Tamás, LvL: 9, Orc\n' +
                        '    7. AshenFang, LvL: 7, race: Worgen\n' +
                        '    8. FródiMigal, LvL: 7, race: Dwarf\n' +
                        '└───── •✧✧✧✧✧✧✧✧✧✧• ─────┘');
                    break;
                case 'repair':
                    if (args[1] === undefined) {
                        func.toDiscordMessage(client, msg, error.noAmountGiven());
                        return;
                    }
                    func.toDiscordMessage(client, msg, hero.repairHero(args[1]));
                    break;
                case 'chest':
                    if (args[1] === undefined || !func.checkArrayIncludes(args[1], chestList)) {
                        func.toDiscordMessage(client, msg, error.noChestGiven());
                        return;
                    }
                    chestType = args[1];
                    chest = new Chest(await database.getMiscellaneous({type: chestType}), await func.getCharacter(author));
                    console.log(chest.chest.price);
                    let hasGold = hero.setHeroGold(-Math.abs(chest.chest.price));
                    if (hasGold === 'no money') {
                        func.toDiscordMessage(client, msg, error.notEnoughMoney());
                        return;
                    }
                    func.toDiscordMessage(client, msg, chest.getChestEmbed(hero));
                    func.toDiscordMessage(client, msg, await chest.getChestRewards());
                    break;
                case 'chests':
                    func.toDiscordMessage(client, msg, func.getChests());
                    break;
            }
        }
    }

    if (msg.content.substring(0, 1) === '.' && (messageChannel === '704983142452428933' || messageChannel === '786140249809354793')) {
        let args = msg.content.substring(1).split(' ');
        let cmd = args[0];
        let channel = args[1];

        let channelId = func.getChannel(channel);
        await msg.delete();
        let sentence = msg.content.slice(5);
        switch (cmd.toLocaleLowerCase()) {
            case 'help':
                func.toDiscordMessage(client, msg, 'Elérhető kommandok:\n ".say" + "channel név" + "szöveg" -> az adott channel-re a szöveget kiírja\n' +
                'elérhető channelek: "lotto", "altalanowos", "18", "kuwuka",  "owoff" (ezt nem kötelező kiírni), "so", "mowozi", "muwusic", "suwuli", "jatekowos"\n' +
                'tagelni tudsz embert, ha beírod az id-ját ide: <@*id*>\n' +
                'channel-t "tagelni" hasonlóan, az id-jával: <#*id*>\n' +
                '.sup <:surp:708969952354500658>\n.tri <:trigger:708979797895938168>\n.cute <:cute:735574079851200582>\n' +
                    '.on_no <:oh_no:735574451088785498>\n.gimme <:gimme:744540992430145586>\n.simp <:simp:744540966215483442>\n' +
                    '.burn <:burn:744540895478808626>\n.ew <:ew:744540932967235674>\n.nameselj <:marotihaha:759804122139983873>\n' +
                    '.hmm <:pepehmm:780723259355824128>\n.dayum <:dayum:785148917326675998>\n.fuck <a:yourmom:787410945541537842>\n' +
                    '.kikerdezte <a:whoasked:719267371029889168>');
                break;
            case 'say':
                if (channelId === '667783025811259448') {
                    func.toDiscordMessageChannel(client, channelId, sentence);
                } else {
                    func.toDiscordMessageChannel(client, channelId, sentence.slice(channel.length + 1));
                }
                break;

            case 'sup':
                func.toDiscordMessageChannel(client, channelId, '<:surp:708969952354500658>');
                break;
            case 'tri':
                func.toDiscordMessageChannel(client, channelId, '<:trigger:708979797895938168>');
                break;
            case 'cute':
                func.toDiscordMessageChannel(client, channelId, '<:cute:735574079851200582>');
                break;
            case 'gimme':
                func.toDiscordMessageChannel(client, channelId, '<:gimme:744540992430145586>');
                break;
            case 'exist':
                func.toDiscordMessageChannel(client, channelId, '<:existing:806124020813791233>');
                break;
            case 'simp':
                func.toDiscordMessageChannel(client, channelId, '<:simp:744540966215483442>');
                break;
            case 'ew':
                func.toDiscordMessageChannel(client, channelId, '<:ew:744540932967235674>');
                break;
            case 'haha':
                func.toDiscordMessageChannel(client, channelId, '<a:haha:826381536256589834>');
                break;
            case 'burn':
                func.toDiscordMessageChannel(client, channelId, '<:burn:744540895478808626>');
                break;
            case 'nameselj':
                func.toDiscordMessageChannel(client, channelId, '<:marotihaha:759804122139983873>');
                break;
            case 'hmm':
                func.toDiscordMessageChannel(client, channelId, '<:pepehmm:780723259355824128>');
                break;
            case 'dayum':
                func.toDiscordMessageChannel(client, channelId, '<:dayum:785148917326675998>');
                break;
            case 'fuck':
                func.toDiscordMessageChannel(client, channelId, '<a:yourmom:787410945541537842>');
                break;
            case 'kikerdezte':
                func.toDiscordMessageChannel(client, channelId, '<a:whoasked:719267371029889168>');
                break;
        }
    }

    if (func.isSimilar(msg.content.toLowerCase(), 'morning gang') > 0.7) {
        let answer = func.rollTheDice(20) ? 'Jó reggelt a faszom <:cuckruce:905801596238200852>' : 'Jó reggelt neked is <:pepeBlush:814526168468160532>';
        func.toDiscordMessage(client, msg, answer);
    }

    if (func.isSimilar(msg.content.toLowerCase(), 'baszadék') > 0.7) {
        func.toDiscordMessage(client, msg, 'Szopadék');
    } else if (func.isSimilar(msg.content.toLowerCase(), 'szopadék') > 0.7) {
        func.toDiscordMessage(client, msg, 'Baszadék');
    }

    if (msg.content.toLowerCase().includes('medishrug')) {
        func.toDiscordMessage(client, msg, '<:madishrug:788328467485032458>');
    } else if (msg.content.toLowerCase().includes('madishrug')) {
        func.toDiscordMessage(client, msg, '<:medishrug:788328451550871552>');
    }

    if (msg.content.toLowerCase().includes('no bully')) {
        func.toDiscordMessage(client, msg, 'https://i.pinimg.com/originals/78/e3/6c/78e36c8c096aeb13b46a3b41cd934c9f.jpg');
    }

    if (msg.content.toLowerCase().includes('maróti') || msg.content.toLowerCase().includes('dimat')
        || msg.content.toLowerCase().includes('maroti') || msg.content.toLowerCase().includes('aranyember')) {
        await msg.react('759804122139983873');
    }

    if (msg.content.toLowerCase().includes('brc')) {
        await msg.react('907560400722231328');
    }

    if (func.isSimilar(msg.content.toLowerCase(), 'megcsap') > 0.8) {
        func.toDiscordMessage(client, msg, '<a:uwu_flotespanking:677984852963885075>');
    }

    if (func.isSimilar(msg.content.toLowerCase(), 'nem mered') > 0.7) {
        func.toDiscordMessage(client, msg, 'hang vaaaagy');
    }

    if (msg.content.toLocaleLowerCase().includes('nem leszek')) {
        func.toDiscordMessage(client, msg, 'Miért nem leszel? ( ._.) Lehet páran örülnének neki...');
    }

    if (msg.content.toLocaleLowerCase() === 'ok') {
        let randomNumber = Math.floor(Math.random() * 6);
        if (randomNumber === 4) {
            func.toDiscordMessage(client, msg, '"k" legalább csináld rendesen');
        }
    }

    if (func.isSimilar(msg.content.toLowerCase(), 'u u uá uá') > 0.7) {
        func.toDiscordMessage(client, msg, '<a:spongebob_dansen:920612079751294986>');
    }

    if (msg.content.includes('facebook.com') || msg.content.includes('fb.watch')) {
        func.sendAttachment('./szerb/lost_face.png', client, msg);
    }

    if (func.isSimilar(msg.content.toLowerCase(), 'komédia arany') > 0.7) {
        func.sendAttachment('./szerb/komedi.png', client, msg);
    }

    try {
        if (firstMention.user.username === 'Pearly') {
            func.toDiscordMessage(client, msg, 'Szeretnél valamit?');
        }
    }catch (e) {

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

client.on('messageDelete', message => {
    let channel = message.channel;
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
        .setAuthor(`${message.author.username}`)
        .setDescription(`${channel}`)
        .addField('Message: ', messageContent, true)
        .setTimestamp();

    let attachment = (message.attachments).array();
    if (message.author.bot || message.channel.id === '704983142452428933' || message.channel.id === deleteChannelId) {}

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
                    func.toDiscordMessageChannel(client, deleteChannelId, pictureEmbed);
                }
            }
        }).catch(console.error);
    } else {
        func.toDiscordMessageChannel(client, deleteChannelId, textEmbed);
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
            .setAuthor(`${user.username}`)
            .addField('Message: ', reaction.message.url, true)
            .setTimestamp();
        func.toDiscordMessageChannel(client, deleteChannelId, textEmbedPin);
    }
});

client.login(process.env.TOKEN);


function voteMuteFilter(reaction, user) {
    if (['👍'].includes(reaction.emoji.name)) {
        if (!voters.includes(user.id)) {
            voters.push(user.id);
            console.log('pushed');
        }
    }else {
        console.log(reaction.emoji.name);
    }
    if (voters.length === 3) {
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
    if (voters.length === 4) {
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
<@239028474696826891> villanyos
<@623899095224025088> medimadi
<@614513037411352607> dontá
<@310497849274007553> dawe
 */
