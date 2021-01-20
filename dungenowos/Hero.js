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
            .setThumbnail(this.hero.img === undefined ? 'https://pbs.twimg.com/profile_images/498979506552832000/rbyajysM.jpeg' : this.hero.img)
            .setAuthor(`${username}`)
            .addField('Status: ',
                `HP: ${this.hero.hp}/${this.hero.maxHp} Regen: ${this.hero.regen}/perc\n` +
                `Armor: ${this.hero.armor}`)
            .addField('Faj: ',
                `${this.hero.race}`)
            .addField('Leírás: ',
                `*${this.hero.description}*`)
            .addField('Stats: ',
                `Strength: ${this.hero.strength}\n` +
                `Intellect: ${this.hero.intellect}\n` +
                `Agility: ${this.hero.agility}\n` +
                `Luck: ${this.hero.luck}\n` +
                `Defense: ${this.hero.defense}\n` +
                `Gold: ${this.hero.gold}`)
            .addField('Experience: ',
                `${this.hero.experience}xp, Elérhető talent: ${this.hero.talent}`);
    }

    setFightHp(enemy, wins) {
        if (this.hero.armor > 0) {
            this.hero.armor -= wins[2];
            if (this.hero.armor < 0) {
                this.hero.hp = (this.hero.hp + this.hero.armor < 0) ? 0 : this.hero.hp + this.hero.armor;
                this.hero.armor = 0;
            }
        } else {
            this.hero.hp = (this.hero.hp - wins[2] < 0) ? 0 : this.hero.hp - wins[2];
        }
        if (enemy.armor > 0){
            enemy.armor -= wins[1];
            if (enemy.armor < 0) {
                enemy.hp = (enemy.hp + enemy.armor < 0) ? 0 : enemy.hp + enemy.armor;
                enemy.armor = 0;
            }
        } else {
            enemy.hp = (enemy.hp - wins[1] < 0) ? 0 : enemy.hp - wins[1];
        }
    }

    fightMonster(hero, enemy, attackType) {
        let missChance;
        let scale = 1;
        let mage = false;
        let hit = Math.floor(Math.random() * 100 + 1);
        switch (attackType) {
            case 'heavy':
                missChance = 50 + (hero.agility * 0.5 - enemy.agility * 0.5);
                scale = 1.5
                break;
            case 'mid':
                missChance = 70 + (hero.agility * 0.5 - enemy.agility * 0.5);
                break;
            case 'weak':
                missChance = 90 + (hero.agility * 0.5 - enemy.agility * 0.5);
                scale = 0.7
                break;
            case 'magic':
                missChance = 101;
                mage = true;
                break;
            default:
                missChance = 101;
                break;
        }

        console.log('hit: ' + hit + ' miss: ' + missChance);

        let monsterStr = func.showStr(enemy, hero, 1, mage);
        if (hit > missChance) return ['miss', 0, monsterStr[0], 0, monsterStr[1], 0, monsterStr[2]];
        let heroStr = func.showStr(hero, enemy, scale, mage);
        let result = [];

        if (monsterStr[0] > heroStr[0]) {
            result.push('monster', heroStr[0], monsterStr[0], heroStr[1], monsterStr[1], heroStr[2], monsterStr[2]);
            return result;
        } else {
            result.push('hero', heroStr[0], monsterStr[0], heroStr[1], monsterStr[1], heroStr[2], monsterStr[2]);
            return result;
        }
    }

    fightResult(client, msg, enemy, attackType, type = 'monster') {
        let wins;
        let result = 'idle';

        switch (type) {
            case 'monster':
                wins = this.fightMonster(this.hero, enemy.getMonster(), attackType);
                func.toDiscordMessage(client, msg,`${this.hero.name}: (${wins[3]} - ${wins[5]}) ${wins[1]} Vs ${enemy.getMonster().name}: (${wins[4]} - ${wins[6]}) ${wins[2]}.`);
                this.setFightHp(enemy.getMonster(), wins);
                console.log(this.hero.hp, enemy.getMonster().hp);
                if (enemy.getMonster().hp === 0) {
                    console.log('war');
                        let newXp = this.hero.experience + enemy.getMonster().experience;
                        let levelled = func.checkLevels(this.hero.level, newXp);
                        console.log(levelled);
                        if (levelled !== 0) {
                            levelled -= enemy.getMonster().experience;
                            console.log(levelled);
                            this.levelUpHero(levelled);
                            func.toDiscordMessage(client, msg, this.decideVictory(this.hero, enemy.getMonster(), 'level'));
                        } else {
                            if ((this.hero.level - enemy.getMonster().level) > 4) {
                                func.toDiscordMessage(client, msg, this.levelGapExceeded());
                                return;
                            } else {
                                func.toDiscordMessage(client, msg, this.decideVictory(this.hero, enemy.getMonster(), 'hero'));
                                this.updateHeroPoint('experience', newXp);
                            }
                        }
                        this.updateHeroPoint('hp', this.hero.hp, this.hero.armor);
                        this.setHeroGold(enemy.getMonster().gold);
                        this.updateHeroPoint('timeout');
                        result = 'done';
                } else if (this.hero.hp === 0) {
                    func.toDiscordMessage(client, msg, this.decideVictory(enemy.getMonster(), this.hero, 'enemy'));
                    this.updateHeroPoint('hp', this.hero.hp, this.hero.armor);
                    this.updateHeroPoint('timeout');
                    result = 'done';
                } else {
                    func.toDiscordMessage(client, msg,`${this.hero.name}: ${this.hero.hp}/${this.hero.maxHp} (${this.hero.armor}) Vs ${enemy.getMonster().name}: ${enemy.getMonster().hp}/${enemy.getMonster().maxHp} (${enemy.getMonster().armor}).`);
                }
                break;

            case 'pvp':
                wins = this.fightMonster(this.hero, enemy.getHero(), attackType);
                func.toDiscordMessage(client, msg,`${this.hero.name}: (${wins[3]} - ${wins[5]}) ${wins[1]} Vs ${enemy.getHero().name}: (${wins[4]} - ${wins[6]}) ${wins[2]}.`);
                let heroGold = this.hero.gold;
                let enemyGold = enemy.getHero().gold;
                let levelDiff = (this.hero.level > enemy.getHero().level) ? (this.hero.level - enemy.getHero().level) : 0;
                let gold = 0;

                if (wins[0] === 'hero') {
                    gold = this.calculateGold(enemyGold, levelDiff);
                    func.toDiscordMessage(client, msg, this.decideVictory(this.hero, enemy.getHero(), 'enemy'));
                    this.setHeroGold(Math.round(gold));
                    enemy.setHeroGold(Math.round(-Math.abs(gold)));
                } else {
                    gold = this.calculateGold(heroGold, levelDiff);
                    func.toDiscordMessage(client, msg, this.decideVictory(enemy.getHero(), this.hero, 'enemy'));
                    enemy.setHeroGold(Math.round(gold));
                    this.setHeroGold(Math.round(-Math.abs(gold)));
                }
                break;
        }
        return result;
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
       if (hpGain === 0) return this.notEnoughRest();
       this.updateHeroPoint('timeout');
       this.updateHeroPoint('rest', hpGain);
       return `A fáradalmaidat kipihented, kaptál ${hpGain} hp-t!`;
    }

    calculateElapsedTime() {
        let startTime, thisTime;
        startTime = this.hero.timeout;
        thisTime = new Date();
        let timeDiff = thisTime - startTime;
        timeDiff /= 1000 * 60;
        return Math.round(timeDiff);
    }

    fleeHero() {
        this.updateHeroPoint('hp', this.hero.hp, this.hero.armor);
        this.updateHeroPoint('timeout');
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
                talent = {regen: this.hero.regen + number*3, talent: this.hero.talent - talentPoint};
                break;
            case 'defense':
                talent = {defense: this.hero.defense + number, talent: this.hero.talent - talentPoint};
                break;
            case 'experience':
                talent = {experience: this.hero.experience + number};
                break;
            case 'maxhp':
                talent = {maxHp: this.hero.maxHp + number*20};
                break;
            case 'gold':
                talent = {gold: this.hero.gold + number};
                break;
            case 'hp':
                talent = {hp: number, armor: talentPoint};
                break;
            case 'armor':
                talent = {armor: this.hero.armor + number};
                break;
            case 'rest':
                talent = {hp: this.hero.hp + number};
                break;
            case 'timeout':
                talent = {timeout: new Date()};
                break;
        }
        console.log(talent, number, stat);
        database.updateCharacter(this.hero.id, talent);
    }

    levelUpHero(xp) {
        database.levelUpCharacter(this.hero, xp);
    }

    setHeroGold(gold) {
        console.log('gold: ' + gold);
        database.updateCharacter(this.hero.id, {gold: this.hero.gold + gold});
    }
}
