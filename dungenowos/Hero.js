import database from "../database/handle_database.js";
import func from "../functions.js";
import Discord from 'discord.js';
import {Errors} from '../Throws/errors.js'

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
            .addField('Status: ',
                `HP: ${this.hero.hp}/${this.hero.maxHp} Regen: ${this.hero.regen}/perc\n` +
                `Armor: ${this.hero.armor}`)
            .addField('Faj: ',
                `${this.hero.race}`)
            .addField('Leírás: ',
                `*${this.hero.description}*`)
            .addField('Stats: ',
                `Power: ${this.hero.strength}\n` +
                `Intellect: ${this.hero.intellect}\n` +
                `Agility: ${this.hero.agility}\n` +
                `Luck: ${this.hero.luck}\n` +
                `Power: ${this.hero.defense}\n` +
                `Gold: ${this.hero.gold}`)
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
        func.toDiscordMessage(client, msg,`${this.hero.name}: (${wins[3]} - ${wins[5]}) ${wins[1]} Vs ${enemy.getMonster().name}: (${wins[4]} - ${wins[6]}) ${wins[2]}.`);

        switch (type) {
            case 'monster':
                if (wins[0] === 'hero') {
                    let newXp = this.hero.experience + enemy.getMonster().experience;
                    let levelled = func.checkLevels(this.hero.level, newXp);
                    console.log(levelled);
                    if (levelled !== 0) {
                        levelled -= enemy.getMonster().experience;
                        console.log(levelled);
                        this.levelUpHero(levelled);
                        func.toDiscordMessage(client, msg, this.decideVictory(this.hero, enemy, 'level'));
                    } else {
                        if ((this.hero.level - enemy.getMonster().level) > 4) {
                            func.toDiscordMessage(client, msg, this.levelGapExceeded());
                            return;
                        } else {
                            func.toDiscordMessage(client, msg, this.decideVictory(this.hero, enemy.getMonster(), 'hero'));
                            this.updateHeroPoint('experience', newXp);
                        }
                    }
                    this.setHeroGold(this.hero, enemy.getMonster().gold);
                } else {
                    func.toDiscordMessage(client, msg, this.decideVictory(enemy.getMonster(), this.hero, 'enemy'));
                }
                break;

            case 'pvp':
                let heroGold = this.hero.gold;
                let enemyGold = enemy.gold;
                let levelDiff = (this.hero.level > enemy.level) ? (this.hero.level - enemy.level) : 0;
                let gold = 0;

                if (wins[0] === 'hero') {
                    gold = this.calculateGold(enemyGold, levelDiff);
                    func.toDiscordMessage(client, msg, this.decideVictory(this.hero, enemy, 'enemy'));
                    this.setHeroGold(this.hero, gold);
                    this.setHeroGold(enemy, -Math.abs(gold));
                } else {
                    gold = this.calculateGold(heroGold, levelDiff);
                    func.toDiscordMessage(client, msg, this.decideVictory(enemy, this.hero, 'enemy'));
                    this.setHeroGold(enemy, gold);
                    this.setHeroGold(this.hero, -Math.abs(gold));
                }
                break;
        }
    }

    calculateGold(loserGold, levelDiff) {
        if (levelDiff < 3) {
            return loserGold * 0.1;
        } else {
            return 0;
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

    rest() {
       let elapsedTime = this.calculateElapsedTime();
       let rested = this.hero.regen * elapsedTime;
       let hpGain = (this.hero.hp + rested > this.hero.maxHp) ? rested - (this.hero.hp + rested - this.hero.maxHp) : rested;
       if (hpGain === 0) return;
       this.updateHeroPoint('rest', hpGain);
    }

    calculateElapsedTime() {
        let startTime, thisTime;
        startTime = this.hero.timeout;
        thisTime = new Date();
        let timeDiff = thisTime - startTime;
        timeDiff /= 1000 * 60;
        return Math.round(timeDiff);
    }

    updateHeroPoint(stat, number = 1, talentPoint = 0) {
        let talent = {};
        switch (stat) {
            case 'strength':
                talent = {strength: this.hero.strength + number, talent: this.hero.talent - talentPoint};
                break;
            case 'intellect':
                talent = {intellect: this.hero.intellect + number, talent: this.hero.talent - talentPoint};
                break;
            case 'agility':
                talent = {agility: this.hero.agility + number, talent: this.hero.talent - talentPoint};
                break;
            case 'luck':
                talent = {luck: this.hero.luck + number, talent: this.hero.talent - talentPoint};
                break;
            case 'regen':
                talent = {regen: this.hero.regen + number, talent: this.hero.talent - talentPoint};
                break;
            case 'defense':
                talent = {defense: this.hero.defense + number, talent: this.hero.talent - talentPoint};
                break;
            case 'experience':
                talent = {experience: this.hero.experience + number};
                break;
            case 'gold':
                talent = {gold: this.hero.gold + number};
                break;
            case 'rest':
                talent = {hp: this.hero.hp + number};
                break;
        }
        database.updateCharacter(this.hero.id, talent);
    }

    levelUpHero(xp) {
        database.levelUpCharacter(this.hero, xp);
    }

    setHeroGold(hero, gold) {
        database.updateCharacter(hero.hero, {gold: this.hero.gold + gold});
    }
}
