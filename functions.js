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
    let freeman = message.guild.roles.find("name", "Freeman");
    let osmagyar = message.guild.roles.find("name", "Ősmagyar");
    let kanker = message.guild.roles.find("name", "Kanker");
    let kanker2 = message.guild.roles.find("name", "Cigány");
    let streamer = message.guild.roles.find("name", "Kokeró");
    let vili = message.guild.roles.find("name", "Csiling-Csiling");
    let dino = message.guild.roles.find("name", "Hurma");
     let tap = message.guild.roles.find("name", "AutistaParaszt");

    let roleArray = [freeman, osmagyar, kanker, kanker2, streamer, vili, dino, tap];

    for (let i = 0; i < roleArray.length ; i++) {
        if (member.roles.has(roleArray[i].id)) {
            return roleArray[i];
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

    /*messageIdCheck: async (id, client) => {
        let message = '';
        await client.channels.get("745317754256490567").fetchMessages({limit: 5}).then(messages => {
            let lastMessages = messages.array();

            for (let i = 0; i < lastMessages.length; i++) {
                if(lastMessages[i].content.includes(id)) {
                     message = lastMessages[i].content;
                     return message;
                }
            }
        }).catch(console.error);
    }*/
}
