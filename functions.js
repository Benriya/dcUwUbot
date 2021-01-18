import database from './database/handle_database.js';
import Discord from 'discord.js';


function getLottoNumbers(array) {
    let returnArray = [];
    array.forEach((value, key, map) =>{
        returnArray.push(`[${key}] = ${value}`);
    });

    return returnArray;
}

export default {
    getChannel: (channel) => {
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

            case 'lotto':
                return '779395227688501298';

            default:
                return '667783025811259448';
        }
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

    chestCheck: (message) => {
        let chestList = ['minor', 'small', 'normal', 'big', 'huge', 'gorgeous', 'giant', 'colossus', 'god'];
        for (let i = 0; i < chestList.length; i++) {
            if(message.toLowerCase().includes(chestList[i])) {
                return false;
            }
        }
        return true;
    },

    raceCheck: (message) => {
        let raceList = ['human', 'orc', 'goblin', 'dwarf', 'elf', 'troll', 'draenei', 'lizard', 'skeleton', 'satyr', 'gnome', 'worgen'];
        for (let i = 0; i < raceList.length; i++) {
            if(message.toLowerCase().includes(raceList[i])) {
                return message;
            }
        }
        return false;
    },

    getRaceList: () => {
        return [
            'Human: allstat+1',
            'Orc: strength+3, agility+1',
            'Goblin: luck+4',
            'Dwarf: strength+2, luck+2',
            'Elf: intellect+3, agility+1',
            'Troll: strength+2, agility+2',
            'Draenei: strength+2, intellect+2',
            'Lizard: agility+4',
            'Skeleton: intellect+4',
            'Satyr: strength+2, intellect+1, agility+1',
            'Gnome: intellect+1, agility+2, luck+1',
            'Worgen: strength+2, agility+1, luck+1'];
    },

    getRaceStats: (race) =>{
        let stats = [];
        switch (race) {
            case 'human':
                stats.push(2, 2, 2, 2);
                break;
            case 'orc':
                stats.push(4, 1, 2, 1);
                break;
            case 'goblin':
                stats.push(1, 1, 1, 5);
                break;
            case 'draenei':
                stats.push(3, 3, 1, 1);
                break;
            case 'gnome':
                stats.push(1, 2, 3, 2);
                break;
            case 'dwarf':
                stats.push(3, 1, 1, 3);
                break;
            case 'elf':
                stats.push(1, 4, 2, 1);
                break;
            case 'troll':
                stats.push(3, 1, 3, 1);
                break;
            case 'lizard':
                stats.push(1, 1, 5, 1);
                break;
            case 'skeleton':
                stats.push(1, 5, 1, 1);
                break;
            case 'satyr':
                stats.push(3, 2, 2, 1);
                break;
            case 'worgen':
                stats.push(3, 1, 2, 2);
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
        let heroes = await database.listCharacters({type: 'Player'});
        for (let i = 0; i < heroes.length; i++) {
            returnArray.push(heroes[i].name, `LvL: ${heroes[i].level}`, `*${heroes[i].description}*`);
        }
        return returnArray;
    },

    showStr:(char, enemy, scale, mage) => {
        if (mage) char.intellect *= 1.2;
        let strength = (2*char.strength < 3*enemy.agility) ? 0 : (2*char.strength - 3*enemy.agility);
        let levelDiff = (enemy.level > char.level) ? 2*(enemy.level - char.level) : 0;
        let charMax = 10 + strength + char.intellect - 2*levelDiff;
        let charMin = 1 + strength + char.intellect - 2*levelDiff;

        if (charMax < 1) {
            charMax = 0;
        }
        if (charMin < 1) {
            charMin = 0;
        }
        let finalDmg = (Math.floor(Math.random() * charMax) + charMin) * scale;
        let def = finalDmg * (enemy.defense / 500);
        finalDmg = Math.floor(finalDmg - def);
        console.log(def, finalDmg);

        return [finalDmg, Math.floor(charMin), Math.floor(charMax+charMin)];
    },

    getAdventures: () => {
        return [
            'Weak: lvl <5',
            'Easy: lvl 5-10',
            'Normal: lvl 10-15',
            'Hard: lvl 15-20',
            'Expert: lvl 20-25',
            'BOSS: lvl 25-30',
            'Usurper: lvl 30-35',
            'Godlike: lvl 35-40'
        ]
    },

    getStats: (message) => {
        let statList = ['strength', 'intellect', 'agility', 'luck'];
        for (let i = 0; i < statList.length; i++) {
            if(message.toLowerCase() === statList[i]) {
                return true;
            }
        }
        return false;
    },

    adventureCheck: (message) => {
        let adventureList = ['Weak', 'Easy', 'Normal', 'Hard', 'Expert', 'BOSS', 'Usurper', 'Godlike'];
        for (let i = 0; i < adventureList.length; i++) {
            if (message === adventureList[i]) {
                return false;
            }
        }
        return true;
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
        let winningNumbers = [];
           // winningNumbers = [1, 1];
        winningNumbers = [Math.round(Math.random() * 6 + 1), Math.round(Math.random() * 6 + 1)];
        return winningNumbers;
    },

    randomKuraiSzoveg: () => {
        let array = ['A', 'S', 'D', '?', ':', '_'];
        let random = Math.floor(Math.random() * 50 + 10);
        let returnSzoveg = '';

        for (let i = 0; i < random; i++) {
            returnSzoveg += array[Math.floor(Math.random() * 6)];
        }
        return returnSzoveg;
    },

    reardinator: (sentence) => {
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
};
