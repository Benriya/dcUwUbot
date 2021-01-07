const database = require('./database/handle_database');
module.exports = {
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
            'Orc: power+3, agility+1',
            'Goblin: luck+4',
            'Dwarf: power+2, luck+2',
            'Elf: intellect+3, agility+1',
            'Troll: power+2, agility+2',
            'Draenei: power+2, intellect+2',
            'Lizard: agility+4',
            'Skeleton: intellect+4',
            'Satyr: power+2, intellect+1, agility+1',
            'Gnome: intellect+1, agility+2, luck+1',
            'Worgen: power+2, agility+1, luck+1'];
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

    playerChange: (players, author) => {
        return players.replace('<@' + author + '>', '');
    },

    getCharacter: async (id) => {
        return await database.listCharacter(id);
    },

    getLottoNumbers: (array) => {
        let returnArray = [];
        array.forEach((value, key, map) =>{
            returnArray.push(`[${key}] = ${value}`);
        });

        return returnArray;
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

    addMemberLotto: (message, member, array) => {
        array.set(member, message);
        return array;
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
            returnSzoveg += array[Math.floor(Math.random() * 12)];
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
    }
}
