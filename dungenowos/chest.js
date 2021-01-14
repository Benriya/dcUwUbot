import database from "../database/handle_database";

const Discord = require("discord.js");

export class Chest {
    name;
    type;
    description;
    img;

    constructor(chest) {
        this.name = chest.name;
        this.type = chest.type;
        this.description = chest.description;
        this.img = chest.img;
    }

    getChestEmbed(hero) {
    return new Discord.MessageEmbed()
        .setColor('#ffd500')
        .setTitle(this.type)
        .setThumbnail(this.img)
        .setAuthor(`Kinyitotta: ${hero.name}`)
        .addField('Description: ',
        this.description);
    }

    rollChest(hero) {
    let chestRoll = Math.round(Math.random() * 100 + 1);
    let good = (86 - hero.Luck) <= 60 ? 60 : (86 - hero.Luck);
    let bad = (31 - hero.Luck) <= 5 ? 5 : (31 - hero.Luck);
    let randomBonus = Math.floor(Math.random() * 17);
    let bonuses = ['experience', 'experience', 'Luck', 'experience', 'experience', 'experience', 'Power', 'experience', 'experience', 'experience', 'Intellect', 'experience', 'experience', 'experience', 'Agility', 'experience', 'experience'];
    let bonus = bonuses[randomBonus];
    let status;

    console.log(good, bad, bonus, chestRoll);

    if(chestRoll > good) {
        status = 'good';
    } else if (chestRoll < bad) {
        status = 'bad';
    } else {
        status = 'neutral';
    }
    return [bonus, status];
    }

    async getChestRewards(hero) {
        let reward = this.rollChest(hero);
        if (reward[1] === 'neutral') {
            return 'A fenébe, egy újabb üres ládát találtál. Biztos fosztogatók jártak itt előtted!';
        } else if (reward[1] === 'good'){
            await database.updateCharacterStat(hero, reward);
            return 'Ládát kinyitottad, és egy üveget találtál benne, valami kékes folyadékkal, amit azonnal meg is ittál.\n' +
                `Érzed hogy megerősödtél, kaptál ${reward[0]}-t `;
        } else {
            await database.updateCharacterStat(hero, reward);
            return 'Ládát kinyitottad, és egy üveget találtál benne, valami feketés folyadékkal, amit azonnal meg is ittál.\n' +
                'Úgy érzed mintha a lelked kiakarna jutni belőled, így összeestél a földön.\n' +
                `Vesztettél ${reward[0]}-t`;
        }
    }
}
