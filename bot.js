import hsp from 'heroku-self-ping';
hsp.default("https://discord8w8bot.herokuapp.com");

import http from 'http';
import PornSearch from 'pornsearch';
import {song} from './songs.js';
import func from './functions.js';
import Discord from 'discord.js';
import database from './database/handle_database.js';
import fs from 'fs';
import { Errors } from './Throws/errors.js';
import { Monster } from './dungenowos/Monster.js';
import { Hero } from './dungenowos/Hero.js';
import { Chest } from './dungenowos/chest.js';
const question = JSON.parse(fs.readFileSync('./dungenowos/fight.json', 'utf8'));
let voters = [];
let winningNumbers = [];
let winners = [];
let cheater, pinger;
let lottoChannelId = '779395227688501298';
let deleteChannelId = '740536932303634473';
let suwuliId = '706776570836156426';
let kurzusok = ['mobilalk', 'webkert', 'nlp', 'infbizt', 'pythonprog'];
let statList = ['strength', 'intellect', 'agility', 'luck', 'maxhp', 'regen', 'defense']
let adventureList = ['critter', 'weak', 'easy', 'normal', 'hard'];
//'expert', 'deathwish', 'usurper', 'mythical', 'godlike'
let chestList = ['minor', 'small', 'normal', 'big', 'huge', 'gorgeous', 'giant', 'colossus', 'god'];

const PORT = process.env.PORT || 4040;
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Szia Dawe');
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
    if (nowDate.getMinutes() === 0 && nowDate.getHours() % 3 === 0) {
        func.toDiscordMessageChannel(client, lottoChannelId, '***Lotto***');
        let checkNumbers = await func.setLottoNumbers();
        let getNumbers = await func.setLottoNumbers('draw');
        func.toDiscordMessageChannel(client, lottoChannelId, checkNumbers);
        winningNumbers = func.drawNumbers();
        func.toDiscordMessageChannel(client, lottoChannelId, 'Nyertes számok: ' + winningNumbers);
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
                    func.toDiscordMessageChannel(client, lottoChannelId, 'Nyertes: ' + '<@' + member.user.id + '>');
                }
            }
        });
        winners = [];
        winningNumbers = [];
        await database.deleteLottoTips();
        func.toDiscordMessageChannel(client, lottoChannelId, 'Új hét indult az uwuLottón, tegyétek meg szavazataitokat 🙂');
    }
},60 * 1000);

client.on('message', async msg => {
    if (msg === undefined) return;
    await client.user.setActivity("The truth | !!help");
    if (msg.author.bot) return;

    let author = msg.author.id;
    let messageChannel = msg.channel.id;
    let firstMention = msg.mentions.members.first();
    let error = new Errors();
    let args = msg.content.substring(1).split(' ');
    let cmd = args[0];
    let attachment = (msg.attachments).array();

    if (msg.content === '+farm') {
        func.toDiscordMessage(client, msg,'nem használunk automatikus botokat, ejnye');
        cheater = author;
    }

    if (msg.attachments.size > 0) {
        func.toDiscordMessageChannel(client, '745317754256490567', `${attachment[0].proxyURL} id: ${attachment[0].id}`);
    }

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
            case 'hess':
                func.sendAttachment('./szerb/hess.gif', client, msg);
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
            case 'csokas':
                func.sendAttachment('./szerb/csokas.png', client, msg);
                func.sendAttachment('./szerb/fasszopokas.png', client, msg);
                break;
            case 'monke':
                func.sendAttachment('./szerb/monke.png', client, msg);
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
            case 'springboot':
                func.sendAttachment('./szerb/springbooooot.mp4', client, msg);
                break;
            case 'medikiakad':
                func.sendAttachment('./szerb/medimadi.mp4', client, msg);
                break;
            case 'bully':
                func.sendAttachment('./szerb/bully.gif', client, msg);
                break;
            case 'kezelhetetlen':
                let files = fs.readdirSync('./slap');
                let chosenFile = files[Math.floor(Math.random() * files.length)];
                func.sendAttachment('./slap/' + chosenFile, client, msg);
                break;
            case 'porn':
                let Searcher;
                if (messageChannel === pornChannel) {
                    Searcher = new PornSearch(sentence);
                    Searcher.gifs()
                        .then(gifs => {
                            let random = Math.floor(Math.random() * gifs.length);
                            func.toDiscordMessage(client, msg, gifs[random].webm);
                            func.toDiscordMessage(client, msg, gifs[random].title);
                        }).catch(() => {
                        func.toDiscordMessage(client, msg, error.noResult());
                        console.log('nothing found');
                    });
                } else {
                    func.toDiscordMessage(client, msg, error.wrongChannel());
                }
                break;
            case '!help':
                await msg.author.send('Szoszi \nAlábbi parancsokkal rendelkezem: \n' +
                    '!porn + "tematika": Küldök egy pornó képet a channelre, olyan témában amit a "tematika" helyett írsz be " jelek nélkül (csak 18+ channelre használd). \n' +
                    '!votemute "tag": (tag helyére tageld meg akit muteolni akarsz 30 sec-re aposztrófok nélkül), meg kell szavazni, 3 szavazat után érvényes. Admint, és botot nem muteolhatsz! \n' +
                    '!votenick "nicknév" "tag: nicknév helyére beírod a kívánt nevet, és tageled akinek a nevét meg akarod változtatni, ehhez 6 szavazat kell, hogy sikeres legyen. \n' +
                    '!kivagy + "tag" megmondja hogy te ki is vagy valójában. \nTovábbá sok káromkodás esetén jelzek hogy ne tedd. \n' +
                    '!kezelhetetlen: ha valaki rosszul viselkedik, helyre teszem egy pofon giffel.\n' +
                    '!praise + "emote" vagy "szöveg": isteni magaslatba emelem azt amit megadtál\n' +
                    '!csicskawall: kilistázom a csicska tanárokat\n' +
                    '!aranywall: kilistázom aranyember tanárokat\n' +
                    '!geci + "valami": meg dingi-dongizom\n' +
                    '!mock + "valami": retard spongyabobként beszélek\n' +
                    '!kurai: elküldöm karcsi által szeretett vicces reagálást\n' +
                    '!ametsu: ametsu kedvenc emote-jait küldöm be\n' +
                    '!lotto "szám" "szám": a lottowo channelen tippelhetsz meg 2db 1 jegyű egész számot, és ha a sorsoláson a tiedet húzom, akkor nyersz :)\n' +
                    '!tippek: kilistázza milyen tippek voltak eddig\n' +
                    '!chad + emote: chad alakban mutatom az emote-ot\n' +
                    '!virgin + emote: virgin alakban mutatom az emote-ot\n' +
                    '!flex + emote + emote: chad vs virgin alakban mutatom az emote-okat\n' +
                    '"no bully" a szövegben azt eredményezi hogy egy stop képet küldök, az abuse megszüntetésére. \n' +
                    'Végül ha valamit 3-an beküldenek a channelre egymás után, akkor én is beszállok és megismétlem. \nTájékoztatót "!!help"-el kérhetsz, de ezt már úgy is tudod.');
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
                func.toDiscordMessage(client, msg,
                    '┌───── •✧Wall Of Csicska✧• ─────┐\n' +
                    '      Bánhelyi Balázs\n' +
                    '      **BigBlueButton**\n' +
                    '      ***C s e n d e s  T i b o r***\n' +
                    '      Csókás Eszter\n' +
                    '      Gazdag-Tóth Boglárka Dr.\n' +
                    '      Gingl Zoltán\n' +
                    '      Hirling Dominik\n' +
                    '      **Kulin Julia**\n' +
                    '      **Makan Gergely**\n' +
                    '      Márkus András\n' +
                    '      Pletl Szilveszter Dr.\n' +
                    '      Pluhár András\n' +
                    '      London András\n' +
                    '      Vida Ágnes\n' +
                    '└───── •✧✧✧✧✧✧✧✧✧✧• ─────┘');
                break;
            case 'aranywall':
                func.toDiscordMessage(client, msg,
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
                    '└────── •✧✧✧✧✧✧✧✧✧• ──────┘');
                break;
            case 'chad':
                await msg.delete();
                if (args[1] !== undefined) {
                    func.toDiscordMessage(client, msg, args[1] + '\n<:chad:827883783742029826>');
                }
                break;
            case 'virgin':
                await msg.delete();
                if (args[1] !== undefined) {
                    func.toDiscordMessage(client, msg, args[1] + '\n<:virgin:827883771859828756>');
                }
                break;
            case 'flex':
                await msg.delete();
                if (args[1] !== undefined && args[2] !== undefined) {
                    func.toDiscordMessage(client, msg, args[1] + '     ' + args[2] + '\n<:chad:827883783742029826>     <:virgin:827883771859828756>');
                }
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
            case 'lotto':
                if (messageChannel === lottoChannelId) {
                    let tip1 = parseInt(args[1]);
                    let tip2 = parseInt(args[2]);
                    let tips = `${tip1} ${tip2}`;

                    if (!isNaN(tip1) && !isNaN(tip2) && (0 < parseInt(tip1) && (parseInt(tip1) < 8) && (0 < parseInt(tip2)) && (parseInt(tip2) < 8))) {
                        if (args[3] === undefined) {
                            let exist = await database.getLotto(author);
                            if (exist !== null) {
                                func.toDiscordMessage(client, msg, error.alreadyTipped());
                            } else {
                                await database.createLottoTip(msg.author.username, author, tips);
                                func.toDiscordMessage(client, msg,`Tipped mentve: ${tips}`);
							}
                        } else if (args[3].toLowerCase() === 'change') {
                            await database.updateLottoTip(msg.author.username, author, tips);
                            func.toDiscordMessage(client, msg,`Tipped mentve: ${tips}`);
                        } else {
                            func.toDiscordMessage(client, msg,error.badTipForLotto());
                        }
                    } else {
                        func.toDiscordMessage(client, msg, error.badTipForLotto());
                    }
                } else {
                    func.toDiscordMessage(client, msg, error.wrongChannel());
                }
                break;
            case 'tippek':
                if (messageChannel === lottoChannelId) {
                    func.toDiscordMessage(client, msg, await func.setLottoNumbers());
                } else {
                    func.toDiscordMessage(client, msg, error.wrongChannel());
                }
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
                if (messageChannel === suwuliId && nickname !== undefined && !pinger) {
                    if (func.checkArrayIncludes(nickname, kurzusok)) {
                        database.subscribeForPing(nickname, author);
                        func.toDiscordMessage(client, msg, 'Feliratkozál teszt pingre: ' + nickname);
                    } else {
                        func.toDiscordMessage(client, msg, error.wrongTestPing());
                    }
                }
                break;
            case 'unsub':
                pinger = await func.checkIfPingerSub(nickname, author);
                if (messageChannel === suwuliId && nickname !== undefined && pinger) {
                    if (func.checkArrayIncludes(nickname, kurzusok)) {
                        database.unsubscribeForPing(nickname, author);
                        func.toDiscordMessage(client, msg, 'Leiratkoztál teszt pingről: ' + nickname);
                    } else {
                        func.toDiscordMessage(client, msg, error.wrongTestPing());
                    }
                }
                break;
            case 'teszt':
                pinger = await func.checkIfPingerSub(nickname, author);
                if (messageChannel === suwuliId && nickname !== undefined && pinger) {
                    if (func.checkArrayIncludes(nickname, kurzusok)) {
                        let pings = await func.getPingUsers(nickname);
                        func.toDiscordMessage(client, msg, pings);
                    } else {
                        func.toDiscordMessage(client, msg, error.wrongTestPing());
                    }
                }
                break;
        }
    }

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
    //RPG-project

    if(msg.attachments.size === 0) {
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
                'elérhető channelek: "suwuli", "owoff (ezt nem kötelező kiírni)", "kuwuka", "18", "mowozi", "jatekowos", "altalanowos", "lotto"\n' +
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
                    func.toDiscordMessageChannel(client, channelId, sentence.slice(channel.length + 1)).catch(data => {
                        console.log(data);
                    });
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

    if (author === '376439826549047296' && msg.content.toLowerCase() === 'tap') {
        func.sendAttachment('./szerb/ninjatap.png', client, msg);
    }

    if (msg.content.toLowerCase() === 'baszadék') {
        func.toDiscordMessage(client, msg, 'Szopadék');
    } else if (msg.content.toLowerCase() === 'szopadék') {
        func.toDiscordMessage(client, msg, 'Baszadék');
    }

    if (msg.content.toLowerCase() === '<:medishrug:788463541107163137>') {
        func.toDiscordMessage(client, msg, '<:madishrug:788328467485032458>');
    } else if (msg.content.toLowerCase() === '<:madishrug:788463507082575893>') {
        func.toDiscordMessage(client, msg, '<:medishrug:788328451550871552>');
    }

    if (msg.content.toLowerCase().includes('no bully')) {
        func.toDiscordMessage(client, msg, 'https://i.pinimg.com/originals/78/e3/6c/78e36c8c096aeb13b46a3b41cd934c9f.jpg');
    }

    if (msg.content.toLowerCase().includes('maróti') || msg.content.toLowerCase().includes('dimat') || msg.content.toLowerCase().includes('maroti') || msg.content.toLowerCase().includes('aranyember')) {
        await msg.react('759804122139983873');
    }

    if (msg.content.toLowerCase().includes('brc')) {
        await msg.react('767665863649787924');
    }

    if (msg.content.toLowerCase().includes('megcsap') || msg.content.toLowerCase().includes('paskol')) {
        func.toDiscordMessage(client, msg, '<a:uwu_flotespanking:677984852963885075>');
    }

    if (msg.content.toLocaleLowerCase().includes('nem mered')) {
        func.toDiscordMessage(client, msg, 'hang vaaaagy');
    }

    if (msg.content.toLocaleLowerCase().includes('nem leszek')) {
        func.toDiscordMessage(client, msg, 'Miért nem leszel? ( ._.) Lehet páran örülnének neki...');
    }

    if (msg.content.toLocaleLowerCase() === 'ok') {
        let randomNumber = Math.floor(Math.random() * 5);
        if (randomNumber === 4) {
            func.toDiscordMessage(client, msg, '"k" legal csináld rendesen');
        }
    }

    try {
        if (firstMention.user.username === 'Pearly') {
            func.toDiscordMessage(client, msg, 'Szeretnél valamit?');
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
    if (message.author.bot || message.channel.id === '704983142452428933' || message.channel.id === deleteChannelId) {

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
                    func.toDiscordMessageChannel(client, deleteChannelId, pictureEmbed);
                }
            }
        }).catch(console.error);
    } else {
        func.toDiscordMessageChannel(client, deleteChannelId, textEmbed);
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
        client.channels.cache.get(deleteChannelId).send(textEmbed);
    }
});

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
