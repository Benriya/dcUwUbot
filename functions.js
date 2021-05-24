import database from './database/handle_database.js';
import Discord from 'discord.js';


function getLottoNumbers(array) {
    let returnArray = [];
    array.forEach((value, key, map) =>{
        returnArray.push(`[${key}] = ${value}`);
    });

    return returnArray;
}


function getEmbeds(hero) {
    return new Discord.MessageEmbed()
        .setColor('#2a5fff')
        .setTitle(`[${hero.name}] LvL: ${hero.level}`)
        .addField('Faj: ',
            `${hero.race}`, true)
        .addField('Leírás: ',
            `*${hero.description}*`, true);
}

export default {
    getChannel: (channel) => {
        switch (channel) {
            case 'lotto':
                return '779395227688501298';
            
            case 'altalanowos':
                return '661569831111491618';
            
            case '18':
                return '667779656363278367';
            
            case 'kuwuka':
                return '671309309757358123';
            
            case 'owoff':
                return '667783025811259448';
            
            case 'so':
                return '839885997923237889'
            
            case 'mowozi':
                return '699657394506170469';
            
            case 'muwusic':
                return '776803915898552320';
            
            case 'suwuli':
                return '706776570836156426';
            
            case 'jatekowos':
                return '713415837356392508';
            
            default:
                return '667783025811259448';
        }
    },

    getCsicskawall: () => {
        return '┌───── •✧Wall Of Csicska✧• ─────┐\n' +
            '      Bánhelyi Balázs\n' +
            '      **BigBlueButton**\n' +
            '      ***C s e n d e s  T i b o r***\n' +
            '      Csókás Eszter\n' +
            '      Gazdag-Tóth Boglárka Dr.\n' +
            '      Gingl Zoltán\n' +
            '      Hirling Dominik\n' +
            '      Jász Judit\n' +
            '      Katona Melinda\n' +
            '      **Kulin Julia**\n' +
            '      **Makan Gergely**\n' +
            '      Márkus András\n' +
            '      Pletl Szilveszter Dr.\n' +
            '      Pluhár András\n' +
            '      London András\n' +
            '      Vida Ágnes\n' +
            '└───── •✧✧✧✧✧✧✧✧✧✧• ─────┘';
    },

    getAranywall: () => {
        return '┌──── •✧Wall Of Aranyember✧• ────┐\n' +
            '      Antal Gábor\n' +
            '      Balogh András\n' +
            '      Cservenák Bence\n' +
            '      Gazdag Zsolt\n' +
            '      Győrffy Lajos\n' +
            '      Heinc Emília\n' +
            '      Kátai Kamilla\n' +
            '      Kardos Péter\n' +
            '      Kardos Péter Dr.\n' +
            '      Fülöp Vanda\n' +
            '      Keleti Márton\n' +
            '      Kicsi András\n' +
            '      Kunos Ádám\n' +
            '      ***Maróti Miklós***\n' +
            '      Szabó Tamás\n' +
            '      Szabolcs Iván\n' +
            '└────── •✧✧✧✧✧✧✧✧✧• ──────┘';
    },

    getCommands: () => {
        return [
            { Parancsok: '`!porn + "tematika":` Küldök egy pornó képet a channelre, olyan témában amit a "tematika" helyett írsz be " jelek nélkül (csak 18+ channelre használd). \n\n' +
                    '`!votemute "tag":` (tag helyére tageld meg akit muteolni akarsz 30 sec-re aposztrófok nélkül), meg kell szavazni, 3 szavazat után érvényes. Admint, és botot nem muteolhatsz! \n\n' +
                    '`!votenick "nicknév" "tag:` nicknév helyére beírod a kívánt nevet, és tageled akinek a nevét meg akarod változtatni, ehhez 6 szavazat kell, hogy sikeres legyen.\n\n' +
                    '`!praise + "emote" vagy "szöveg":` isteni magaslatba emelem azt amit megadtál\n\n' +
                    '`!kivagy + "tag":` megmondja hogy te ki is vagy valójában. \n\n' +
                    '`!kezelhetetlen:` ha valaki rosszul viselkedik, helyre teszem egy pofon giffel.\n\n' +
                    '`!csicskawall:` kilistázom a csicska tanárokat\n\n' +
                    '`!aranywall:` kilistázom aranyember tanárokat'},
            { Parancsok: '`!ametsu/!amecu:` ametsu kedvenc emote-jait küldöm be\n\n' +
                    '`!geci + "valami":` meg dingi-dongizom\n\n' +
                    '`!mock + "valami":` retard spongyabobként beszélek\n\n' +
                    '`!kurai:` elküldöm karcsi által szeretett vicces reagálást\n\n' +
                    '`!lotto "szám" "szám":` a lottowo channelen tippelhetsz meg 2db 1 jegyű egész számot, és ha a sorsoláson a tiedet húzom, akkor nyersz :)\n\n' +
                    '`!tippek:` kilistázza milyen tippek voltak eddig\n\n' +
                    '`!pisti/!szepi/!inevitable:` pisti az elkerülhetetlen\n\n' +
                    '`!medikiakad:` prezentálim mi van akkor, ha MediMadi kiakad'},
            { Parancsok: '`!chad + emote:` chad alakban mutatom az emote-ot\n\n' +
                    '`!virgin + emote:` virgin alakban mutatom az emote-ot\n\n' +
                    '`!flex + emote + emote:` chad vs virgin alakban mutatom az emote-okat\n\n' +
                    '`!kurva:` Swarci ordít egyet\n\n' +
                    '`!mitcsinalsz:` megkérdőjelezem, hogy tudod-e mit csinálsz\n\n' +
                    '`!nemtudom:` miért nem lehet tudod? Csalódtam.\n\n' +
                    '`!assemble:` UwU egyesülj!\n\n' +
                    '`!uwu:` strong together'},
            { Parancsok: '`!uncool:` hát ez nem menő teso\n\n' +
                    '`!springboot:` Oooo spring BOOT\n\n' +
                    '`!vicci:` de vicci vagy\n\n' +
                    '`!monke:` Return monke\n\n' +
                    '`!rule:` A legfőbb szabály\n\n' +
                    '`!alma:` The forbidden one\n\n' +
                    '`!hess:` Na menj innen\n\n' +
                    '`!hirling:` Mit csinál vajon javítás helyett?'},
            { Parancsok: '`!gay:` Teátrális buzi vagy\n\n' +
                    '`!csokas:` Aki fasszopókás\n\n' +
                    '`!micsinalsz:` Mégis mit csinálsz??\n\n' +
                    '`!faszom:` oh bazdmeg még ez is van\n\n' +
                    '`!sub + "teszttel rendelkező kurzus":` Feliratkozhatsz olyan ping csoportba, ahol ezt a tesztet töltik ki\n\n' +
                    '`!unsub + "teszttel rendelkező kurzus":` Leiratkozol a pingekről\n\n' +
                    '`!teszt + "kurzus":` Akik fel vannak iratkozva a kurzusra azokat megpingelem\n\n' +
                    '`!risus + "channel név":` Tipik risusing csak te nem használhatod ezt'},
            { Parancsok: '`"bully"` a szövegben, akkor lespriccelem a másikat.\n\n' +
                    '`"no bully"` a szövegben azt eredményezi hogy egy stop képet küldök, az abuse megszüntetésére.\n\n' +
                    '`Ha 3x beküldik ugyanazt, akkor megismétlem`\n\n' +
                    '`baszadékra szopadékot írok, és fordítva`\n\n' +
                    '`medishug-ra madishrugot küldök és fordítva`\n\n' +
                    '`brc van a szövegben brc-t reactolok`\n\n' +
                    '`maroti, maróti, dimat van a szövegben marótit reactolok`\n\n' +
                    '`megcsap, nem mered, nem leszek-re is reactolok`'},
        ];
    },

    checkIfSame: (array) => {
        if (array[0].author.bot || array[1].author.bot || array[2].author.bot) {
            return false;
        }
        if (array[0].author !== array[1].author && array[1].author !== array[2].author && array[0].author !== array[2].author && array[0].content === array[1].content && array[1].content === array[2].content) {
            return true;
        }
    },

    async fightEmbed(heroEmbed, enemyEmbed, desc, webhook) {
        await webhook.send(desc, {
            embeds: [heroEmbed, enemyEmbed],
        });
    },

    raceCheck: (message) => {
        let raceList = ['human', 'orc', 'goblin', 'dwarf', 'elf', 'troll', 'draenei', 'lizard', 'skeleton', 'satyr', 'gnome', 'worgen'];
        if (raceList.includes(message.toLowerCase())) {
            return message;
        }
        return false;
    },

    getRaceList: () => {
        return [
            '**Human**: maxHp:70, regen:19, armor:10, def:5, str:3, int:3, agi:3, luck:3, gold:100',
            '**Orc**: maxHp:120, regen:4, armor:10, def:5, str:7, int:1, agi:3, luck:1, gold:100',
            '**Goblin**: maxHp:40, regen:28, armor:10, def:5, str:1, int:1, agi:1, luck:9, gold:500',
            '**Dwarf**: maxHp:70, regen:19, armor:10, def:5, str:4, int:1, agi:4, luck:3, gold:100',
            '**Elf**: maxHp:50, regen:25, armor:10, def:0, str:1, int:6, agi:4, luck:1, gold:500',
            '**Troll**: maxHp:100 regen:37, armor:10, def:0, str:4, int:1, agi:6, luck:1, gold:100',
            '**Draenei**: maxHp:80, regen:16, armor:10, def:5, str:5, int:5, agi:1, luck:1, gold:100',
            '**Lizard**: maxHp:60, regen:2, armor:10, def:5, str:3, int:1, agi:7, luck:1, gold:100',
            '**Skeleton**: maxHp:100, regen:10, armor:10, def:0, str:1, int:9, agi:1, luck:1, gold:500',
            '**Satyr**: maxHp:80, regen:16, armor:10, def:0, str:4, int:3, agi:4, luck:1, gold:500',
            '**Gnome**: maxHp:60, regen:22, armor:10, def:0, str:1, int:5, agi:3, luck:3, gold:500',
            '**Worgen**: maxHp:90, regen:13, armor:10, def:5, str:3, int:1, agi:5, luck:3, gold:100'];
    },

    getRaceStats: (race) =>{
        let stats = [];
        switch (race) {
            case 'human':
                stats.push(70, 19, 10, 5, 3, 3, 3, 3, 100);
                break;
            case 'orc':
                stats.push(120, 4, 10, 5, 7, 1, 3, 1, 100);
                break;
            case 'goblin':
                stats.push(40, 28, 10, 0, 1, 1, 1, 9, 500);
                break;
            case 'draenei':
                stats.push(80, 16, 10, 5, 5, 5, 1, 1, 100);
                break;
            case 'gnome':
                stats.push(60, 22, 10, 0, 1, 5, 3, 3, 500);
                break;
            case 'dwarf':
                stats.push(70, 19, 10, 5, 4, 1, 4, 3, 100);
                break;
            case 'elf':
                stats.push(50, 25, 10, 0, 1, 6, 4, 1, 500);
                break;
            case 'troll':
                stats.push(100, 37, 10, 0, 4, 1, 6, 1, 100);
                break;
            case 'lizard':
                stats.push(60, 22, 10, 5, 3, 1, 7, 1, 100);
                break;
            case 'skeleton':
                stats.push(100, 10, 10, 0, 1, 9, 1, 1, 500);
                break;
            case 'satyr':
                stats.push(80, 16, 10, 0, 4, 3, 4, 1, 500);
                break;
            case 'worgen':
                stats.push(90, 13, 10, 5, 3, 1, 5, 3, 100);
                break;
        }
        return stats;
    },

    getEnemy: async (diff) => {
        let enemies = await database.getEnemy({diff: diff});
        return enemies[Math.floor(Math.random() * enemies.length)];
    },
    getCharacter: async (id) => {
        return database.listCharacter(id);
    },

    getAllHero: async () => {
        let returnArray = [];
        let heroes = await database.getEnemy({type: 'Player'});
        for (let i = 0; i < heroes.length; i++) {
            returnArray.push(getEmbeds(heroes[i]));
        }

        return returnArray;
    },

    async sendAllHeroes(heroEmbed, desc, webhook) {
        await webhook.send(desc, {
            embeds: heroEmbed,
        });
    },

    showStr:(attacker, enemy, scale, mage) => {
        let strength, intellect;
        if (mage) {
            intellect = (attacker.intellect * 1.1) + attacker.intellect*0.1;
            strength = (1*attacker.strength < 3*enemy.agility) ? 0 : (1*attacker.strength - 3*enemy.agility);
        }
        if (!mage) {
            intellect = attacker.intellect;
            strength = (2*attacker.strength < 3*enemy.agility) ? 0 : (2*((attacker.strength * scale) + attacker.strength*0.1) - 3*enemy.agility);
        }

        let levelDiff = (enemy.level > attacker.level) ? 2*(enemy.level - attacker.level) : 0;
        let charMax = 10 + strength + intellect - levelDiff;
        let charMin = 1 + strength + intellect - levelDiff;

        if (charMax < 1) {
            charMax = 0;
        }
        if (charMin < 1) {
            charMin = 0;
        }
        let finalDmg = (Math.floor(Math.random() * charMax) + charMin);
        let def = finalDmg * (enemy.defense / 500);
        finalDmg = Math.floor(finalDmg - def) < 0 ? 0 : Math.floor(finalDmg - def);
        console.log(def, finalDmg);


        return [finalDmg, Math.floor(charMin), Math.floor(charMax+charMin)];
    },

    getAdventures: () => {
        return [
            '**Critter**: lvl 1-3',
            '**Weak**: lvl 4-7',
            '**Easy**: lvl 8-11',
            '**Normal**: lvl 12-15',
            '**Hard**: lvl 16-19',
            '**Expert**: lvl 21-23',
            '**Usurper**: lvl 24-27',
            '**DeathWish**: lvl 28-31',
            '**Mythical**: lvl 32-35',
            '**Godlike**: lvl 36-39',
        ]
    },

    getChests: () => {
        return [
            'Gold, armor, xp:',
            '**Minor**: 200g',
            '**Small**: 400g',
            '**Normal**: 800g',
            '**Big**: 1200g',
            '**Huge**: 2000g',
            'Csak statokat adnak:',
            '**Gorgeous**: 4000g (1)',
            '**Giant**: 6000g (3)',
            '**Colossus**: 8000g (5)',
            '**God**: 10000g (10)',
        ]
    },

    checkLevels: (level, experience) => {
        let xp = 100;
        for (let i = 1; i <= 70; i++) {
            if (i === level) {
                if (experience >= xp) {
                    return xp;
                }
                return 0;
            }
            xp += i*100;
        }
        return 0;
    },

    setLottoNumbers: async (type = 'get') => {
        let returnArray = new Map();
        let lottok = await database.getLottoTips();
        if (type === 'get') {
            for (let i = 0; i < lottok.length; i++) {
                returnArray.set(lottok[i].name, lottok[i].tipp);
            }
            return getLottoNumbers(returnArray);
        }
        if (type === 'draw') {
            for (let i = 0; i < lottok.length; i++) {
                returnArray.set(lottok[i].name, lottok[i].tipp);
            }
            return returnArray;
        }

    },

    drawWinners: (array, winningNumbers) => {
        let winners = [];
        array.forEach((value, key, map) =>{
            console.log(`m[${key}] = ${value}`);
            let reverseValue = value.split("").reverse().join("");
            if (value === `${winningNumbers[0]} ${winningNumbers[1]}` || reverseValue === `${winningNumbers[0]} ${winningNumbers[1]}`) {
                winners.push(key);
            }
        });
        console.log(winners);
        return winners;
    },

    drawNumbers: () => {
           // winningNumbers = [1, 1];
        return [Math.round(Math.random() * 6 + 1), Math.round(Math.random() * 6 + 1)];
    },

    randomLongMessage: (array, random) => {
        let returnSzoveg = '';

        for (let i = 0; i < random; i++) {
            returnSzoveg += array[Math.floor(Math.random() * array.length)];
        }
        return returnSzoveg;
    },

    retardinator: (sentence) => {
        let splittedSentence = sentence.toLowerCase().split("");
        for (let i = 1; i < splittedSentence.length; i+=2) {
            splittedSentence[i] = splittedSentence[i].toUpperCase();
        }
        splittedSentence = splittedSentence.join("");
        return splittedSentence;
    },

    sendAttachment: (image, client, msg) => {
        let attachment = new Discord.MessageAttachment(image);
        return client.channels.cache.get(msg.channel.id).send(attachment);
    },

    toDiscordMessage(client, msg, message) {
        client.channels.cache.get(msg.channel.id).send(message);
    },

    toDiscordMessageChannel(client, channelId, message) {
        client.channels.cache.get(channelId).send(message);
    },

    checkArrayIncludes: (message, params) => {
        return params.includes(message.toLowerCase());
    },

    getPingUsers: async (nickname) => {
        let returnArray = [];
        let ping = await database.getAllSubscriber(nickname);
        for (let i = 0; i < ping.length; i++) {
            returnArray.push('<@' + ping[i].id + '>');
        }

        return returnArray;
    },

    checkIfPingerSub: async (kurzus, author) => {
        let result = await database.getPinger(kurzus, author);
        return result !== null;
    }
};
