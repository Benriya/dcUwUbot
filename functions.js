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

 swearListCheck: (message) => {
    let swearList = ['anyád', 'geci', 'hugy', 'kurva', 'ribanc', 'buzi', 'picsába', 'fasz', 'szar ', 'rühes', 'gedva', 'csicska', 'pina'];
    for (let i = 0; i < swearList.length; i++) {
        if(message.toLowerCase().includes(swearList[i])) {
            return true;
        }
    }
},

    playerChange: (players, author) => {
        return players.replace('<@' + author + '>', '');
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
            if (value === `${winningNumbers[0]} ${winningNumbers[1]}` || reverseValue === `${winningNumbers[1]} ${winningNumbers[0]}`) {
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
        winningNumbers = [Math.round(Math.random()* 8 + 1), Math.round(Math.random()* 8 + 1)];
        return winningNumbers;
    }
}
