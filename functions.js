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
        winningNumbers = [Math.round(Math.random() * 8 + 1), Math.round(Math.random() * 8 + 1)];
        return winningNumbers;
    },

    randomKuraiSzoveg: () => {
        let array = ['A', 'S', 'D', '?', ':', '_', ':', '_', '?', 'D', 'S', 'A'];
        let random = Math.floor(Math.random() * 30 + 10);
        let returnSzoveg = '';

        for (let i = 0; i < random; i++) {
            returnSzoveg += array[Math.floor(Math.random() * 12)];
        }
        return returnSzoveg;
    },

    reardinator: (sentence) => {
        let splittedSentence = sentence.toLowerCase().split("");
        /*let kisBetu = 0;
        let nagyBetu = 0;
        for (let i = 1; i < splittedSentence.length; i++) {
            if (kisBetu === 3) {
                splittedSentence[i] = splittedSentence[i].toUpperCase();
                kisBetu = 0;
                nagyBetu++;

                console.log('kis3');
                continue;
            } else if (nagyBetu === 3) {
                nagyBetu = 0;
                kisBetu++;
                console.log('nagy3');
                continue;
            }

            if (Math.round(Math.random()) === 0) {
                splittedSentence[i] = splittedSentence[i].toUpperCase();
                kisBetu = 0;
                nagyBetu++;
                console.log('nagy');
            } else {
                kisBetu++;
                nagyBetu = 0;
                console.log('kis');
            }
        }*/
        for (let i = 1; i < splittedSentence.length; i+=2) {
            splittedSentence[i] = splittedSentence[i].toUpperCase();
        }
        splittedSentence = splittedSentence.join("");
        return splittedSentence;
    }
}
