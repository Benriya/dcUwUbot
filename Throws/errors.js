const Discord = require("discord.js");

export class Errors {
    message;

    constructor() {
    }

    getReply(message) {
        return new Discord.MessageEmbed().setColor('#ff0000').addField('❌', message);
    }

    wrongChannel() {
        this.message = 'Ne ebbe a channelbe írd!';
        return this.getReply(this.message);
    }

    badTipForLotto() {
        this.message = '1-7 között számmal tippelj!';
        return this.getReply(this.message);
    }

    noTalent() {
        this.message = 'Neked nincs talent pontod!';
        return this.getReply(this.message);
    }

    levelGapExceeded() {
        this.message = 'Túl nagy a szintkülönbség, nem jár xp!';
        return this.getReply(this.message);
    }

    noResult() {
        this.message = 'Nincs találat!';
        return this.getReply(this.message);
    }

    noDifficultGiven() {
        this.message = 'Adj meg megfelelő nehézséget!';
        return this.getReply(this.message);
    }

    existHero() {
        this.message = 'Már létezik karaktered!';
        return this.getReply(this.message);
    }

    badRaceGiven() {
        this.message = 'Választható fajt adj meg!';
        return this.getReply(this.message);
    }

    deniedVote() {
        this.message = 'Elutasítva';
        return this.getReply(this.message);
    }

    alreadyTipped() {
        this.message = 'Te már tippeltél, tippet a beírt számok után való "change" szöveggel módosíthatsz';
        return this.getReply(this.message);
    }

    badRaceOrName() {
        this.message = 'Adj meg nevet és fajt is!';
        return this.getReply(this.message);
    }

}
