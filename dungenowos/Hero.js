import database from "../database/handle_database";
import func from "../functions";

const Discord = require("discord.js");

export class Hero {
    hero;

    constructor(hero) {
        this.hero = hero;
    }

    getHero() {
        return this.hero;
    }

    getHeroEmbed(username) {
        return new Discord.MessageEmbed()
            .setColor('#36ff00')
            .setTitle(`[${this.hero.name}] LvL: ${this.hero.level}`)
            .setThumbnail(this.hero.img)
            .setAuthor(`${username}`)
            .addField('Race: ',
                `${this.hero.race}`)
            .addField('Description: ',
                `*${this.hero.description}*`)
            .addField('Stats: ',
                `Power: ${this.hero.Power}\n` +
                `Intellect: ${this.hero.Intellect}\n` +
                `Agility: ${this.hero.Agility}\n` +
                `Luck: ${this.hero.Luck}`)
            .addField('Experience: ',
                `${this.hero.experience}xp, Elérhető talent: ${this.hero.talent}`);
    }

    fightMonster(hero, enemy) {
        let heroStr = func.showStr(hero, enemy);
        let monsterStr = func.showStr(enemy, hero);
        let result = [];

        if (monsterStr[0] > heroStr[0]) {
            result.push('monster', heroStr[0], monsterStr[0], heroStr[1], monsterStr[1], heroStr[2], monsterStr[2]);
            return result;
        } else {
            result.push('hero', heroStr[0], monsterStr[0], heroStr[1], monsterStr[1], heroStr[2], monsterStr[2]);
            return result;
        }
    }

    setTalentPoint(stat) {
        database.addTalentCharacter(this.hero, stat);
    }

    levelUpHero(xp) {
        database.levelUpCharacter(this.hero, xp);
    }

    setHeroXp(xp) {
        database.updateCharacterXp(this.hero, xp);
    }
}
