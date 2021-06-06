import fs from "fs";

let statList = ['strength', 'intellect', 'agility', 'luck', 'maxhp', 'regen', 'defense']
let adventureList = ['critter', 'weak', 'easy', 'normal', 'hard'];
//'expert', 'deathwish', 'usurper', 'mythical', 'godlike'
let chestList = ['minor', 'small', 'normal', 'big', 'huge', 'gorgeous', 'giant', 'colossus', 'god'];
const question = JSON.parse(fs.readFileSync('./dungenowos/fight.json', 'utf8'));

//RPG-project
import func from "./functions";
import {Hero} from "./dungenowos/Hero";
import database from "./database/handle_database";
import {Monster} from "./dungenowos/Monster";
import {Chest} from "./dungenowos/chest";

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
/*
characterCreate: (name, race, img, description, id, maxHp, regen, armor, defense, strength, intellect, agility, luck, gold) => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        let dbo = db.db("mydb");
        let myobj = {name: name, description: description, img: img, race: race, id: id, hp: maxHp, maxHp: maxHp, regen: regen, armor: armor, defense: defense, strength: strength, intellect: intellect, agility: agility, luck: luck, gold: gold, experience: 0, level: 1, talent: 0, type: 'Player', timeout: 0};
        dbo.collection("Characters").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });
},

    listCharacter: (id) => {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
            if (err) throw err;
            let dbo = db.db("mydb");
            dbo.collection("Characters").findOne({id: id}, function (err, result) {
                if (err) throw err;
                db.close();
                resolve(result);
            });
        });
    });
},

    getEnemy: (query) => {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
            if (err) throw err;
            let dbo = db.db("mydb");
            dbo.collection("Characters").find(query).toArray(function (err, result) {
                if (err) throw err;
                db.close();
                resolve(result);
            });
        });
    });
},

    getMiscellaneous: (query) => {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
            if (err) throw err;
            let dbo = db.db("mydb");
            dbo.collection("Characters").findOne(query, function (err, result) {
                if (err) throw err;
                //console.log(result);
                db.close();
                resolve(result);
            });
        });
    });
},

    levelUpCharacter: (char, xp) => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
        if (err) throw err;
        let dbo = db.db("mydb");
        let myQuery = { id: char.id };
        let newValues = { $set: {level: char.level+1, hp: char.maxHp, maxHp: char.maxHp+20, armor: char.armor+50, talent: char.talent+3, experience: char.experience-xp } };
        dbo.collection("Characters").updateOne(myQuery, newValues, function(err, res) {
            if (err) throw err;
            console.log('levelup');
            db.close();
        });
    });
},

    updateCharacter: (char, args) => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
        if (err) throw err;
        let dbo = db.db("mydb");
        let myQuery = { id: char };
        let newValues = { $set: args };
        dbo.collection("Characters").updateOne(myQuery, newValues, function(err, res) {
            if (err) throw err;
            console.log('updateHero');
            db.close();
        });
    });
},
*/
