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

 checkRole: (message, member) => {
    let freeman = message.guild.roles.cache.get("699692497986912316");
    let osmagyar = message.guild.roles.cache.get("704023208072052836");
    let kanker = message.guild.roles.cache.get("667784518937083985");
    let kanker2 = message.guild.roles.cache.get("715313396152533082");
    let kokero = message.guild.roles.cache.get("667785010874417222");
    let vili = message.guild.roles.cache.get("703947497676079134");
    let hurma = message.guild.roles.cache.get("737305438705680504");
    let tap = message.guild.roles.cache.get("760808363712839680");
    let deci = message.guild.roles.cache.get("742093821566779435");

    let roleArray = [freeman, osmagyar, kanker, kanker2, kokero, vili, hurma, tap, deci];

    for (let i = 0; i < message.guild.roles.cache.size ; i++) {
        console.log(member.roles.cache.array()[i].id);

        for (let j = 0; j < roleArray.length; j++) {
            console.log(roleArray[j]);
            if (member.roles.cache.array()[i].id === roleArray[j].id) {
                console.log(roleArray[j]);
                return roleArray[j];
            }
        }
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

    tagList: (game, author) => {
        let players;
        switch (game) {
            case 'wow':
                players = '<@491660100990140436> <@518823389008232460> <@318072258465628161>';
                break;
            case 'kf2':
                players = '<@279565175588388865> <@295485347138240513> <@602525564217327637> <@376439826549047296> <@318072258465628161> <@518823389008232460>';
                break;
            case 'lol':
                players = '<@295485347138240513> <@310397550173880320> <@239028474696826891> <@279565175588388865>';
                break;
        }
        return playerChange(players, author);
    },
}
