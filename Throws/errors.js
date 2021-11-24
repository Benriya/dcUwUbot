import Discord from 'discord.js';

export class Errors {
    message;

    constructor() {
    }

    getReply(message) {
        return new Discord.MessageEmbed().setColor('#ff0000').setTitle('❌ ' + message);
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

    noStatGiven() {
        this.message = 'Add meg mire akarsz talentolni';
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

    noChestGiven() {
        this.message = 'Adj meg rendelkezésre álló chestet!';
        return this.getReply(this.message);
    }

    existHero() {
        this.message = 'Már létezik karaktered!';
        return this.getReply(this.message);
    }

    nonExistHero() {
        this.message = 'Még nincs karaktered!';
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

    noAmountGiven() {
        this.message = 'Adj meg összeget!';
        return this.getReply(this.message);
    }

    notEnoughMoney() {
        this.message = 'Nincs elég pénzed hozzá!';
        return this.getReply(this.message);
    }

    notEnoughRest() {
        this.message = 'Többet kell várnod, hogy regenerálódj!';
        return this.getReply(this.message);
    }

    noSuchMeme() {
        this.message = 'Nincs ilyen meme template! (texas, peter)';
        return this.getReply(this.message);
    }

    wrongTestPing() {
        this.message = 'Teszttel rendelkező kurzust adj meg!';
        return this.getReply(this.message);
    }
}
