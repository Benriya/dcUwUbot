import database from "../database/handle_database.js";
import func from "../functions.js";
import Discord from 'discord.js';
import {Errors} from 'Throws/errors'

export class Hero extends Errors{
    hero;

    constructor(hero) {
        super();
        this.hero = hero;
    }

    getHero() {
        return this.hero;
    }

    getHeroEmbed(username) {
        return new Discord.MessageEmbed()
            .setColor('#8bff63')
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

    fightResult(client, msg, enemy, type = 'monster') {
        let wins = this.fightMonster(this.hero, enemy.getMonster());
        func.toDiscordMessage(client, msg,`${this.hero.name}: (${wins[3]} - ${wins[5]}) ${wins[1]} Vs ${enemy.name}: (${wins[4]} - ${wins[6]}) ${wins[2]}.`);
        if (wins[0] === 'hero') {
            if(type === 'monster') {
                let newXp = this.hero.experience + enemy.experience;
                let levelled = func.checkLevels(this.hero.level, newXp);
                if (levelled !== 0) {
                    levelled -= enemy.experience;
                    this.levelUpHero(this.hero, levelled);
                    func.toDiscordMessage(client, msg, this.decideVictory(this.hero, enemy, 'level'));
                } else {
                    if ((this.hero.level - enemy.level) > 4) {
                        func.toDiscordMessage(client, msg, this.levelGapExceeded());
                    } else {
                        this.setHeroXp(this.hero, newXp);
                        func.toDiscordMessage(client, msg, this.decideVictory(this.hero, enemy, 'hero'));
                    }
                }
            } else {
                func.toDiscordMessage(client, msg, this.decideVictory(this.hero, enemy, 'enemy'));
            }
        } else {
            func.toDiscordMessage(client, msg, this.decideVictory(enemy, this.hero, 'enemy'));
        }
    }

    decideVictory(winner, loser, mode) {
        switch (mode) {
            case 'level':
                return `Gratulálok ${winner.name} elintézted ${loser.name}-t. <:pogger:780724037331845151> Sikeresen szintet léptél!`;
            case 'hero':
                return `Gratulálok ${winner.name} elintézted ${loser.name}-t. Jutalmad ${loser.experience}xp!`;
            case 'enemy':
                return `Sajnos ${winner.name} elintézted téged ${loser.name}! <a:bonkgif:780722290945294356>`;
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
