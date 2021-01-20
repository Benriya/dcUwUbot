import Discord from 'discord.js';
import {Hero} from "./Hero.js";

export class Chest extends Hero{
    chest;

    constructor(chest, hero) {
        super(hero);
        this.chest = chest
    }

    getChestEmbed(hero) {
    return new Discord.MessageEmbed()
        .setColor('#ffd500')
        .setTitle(this.chest.name)
        .setThumbnail(this.chest.img)
        .setAuthor(`Kinyitotta: ${hero.hero.name}`)
        .addField('Ára: ',
            `${this.chest.price} gold`)
        .addField('Leírás: ',
        this.chest.description);
    }

    rollChest(hero) {
        let type = this.chest.type;
        let chestRoll = Math.round(Math.random() * 100 + 1);
        let good, status, reward, scale;
        let rewards = [];
        switch (type) {
            case 'minor':
                good = (61 - hero.luck) <= 20 ? 20 : (61 - hero.luck);
                rewards.push('experience', 'gold', 'armor', 'armor', 'gold', 'armor');
                scale = Math.round(Math.random() * 200 + 1);
                reward = this.calculateReward(rewards, scale);
                break;
            case 'small':
                good = (66 - hero.luck) <= 30 ? 30 : (66 - hero.luck);
                rewards.push('experience', 'gold', 'armor', 'armor', 'gold', 'gold', 'experience', 'gold');
                scale = Math.round(Math.random() * 300 + 1);
                reward = this.calculateReward(rewards, scale);
                break;
            case 'normal':
                good = (71 - hero.luck) <= 40 ? 40 : (71 - hero.luck);
                rewards.push('experience', 'gold', 'armor', 'experience', 'armor', 'armor', 'experience', 'gold');
                scale = Math.round(Math.random() * 400 + 1);
                reward = this.calculateReward(rewards, scale);
                break;
            case 'big':
                good = (76 - hero.luck) <= 50 ? 50 : (76 - hero.luck);
                rewards.push('experience', 'gold', 'armor', 'gold');
                scale = Math.round(Math.random() * 500 + 1);
                reward = this.calculateReward(rewards, scale);
                break;
            case 'huge':
                good = (81 - hero.luck * 0.9) <= 60 ? 60 : (91 - hero.luck * 0.9);
                rewards.push('experience', 'gold', 'armor', 'experience', 'armor', 'armor', 'experience', 'gold');
                scale = Math.round(Math.random() * 600 + 1);
                reward = this.calculateReward(rewards, scale);
                break;
            case 'gorgeous':
                good = (86 - hero.luck * 0.7) <= 60 ? 60 : (91 - hero.luck * 0.7);
                rewards.push('experience', 'gold', 'armor', 'defense', 'experience', 'gold', 'armor', 'armor', 'experience', 'gold');
                scale = Math.round(Math.random() * 700 + 1);
                reward = this.calculateReward(rewards, scale);
                break;
            case 'giant':
                good = (91 - hero.luck * 0.5) <= 80 ? 80 : (91 - hero.luck * 0.5);
                rewards.push('strength', 'agility', 'intellect', 'defense', 'regen',);
                reward = this.calculateReward(rewards, 3);
                break;
            case 'colossus':
                good = (96 - hero.luck * 0.3) <= 80 ? 80 : (96 - hero.luck * 0.3);
                rewards.push('strength', 'agility', 'intellect', 'defense', 'regen');
                reward = this.calculateReward(rewards, 5);
                break;
            case 'god':
                good = (99 - hero.luck * 0.1) <= 80 ? 80 : (99 - hero.luck * 0.1);
                rewards.push('strength', 'agility', 'intellect', 'defense');
                reward = this.calculateReward(rewards, 10);
                break;
        }
    console.log(good, chestRoll);

    if(chestRoll > good) {
        status = 'good';
    } else {
        status = 'neutral';
    }
    return [reward[0], reward[1], status];
    }

    calculateReward(rewards, scale = 1) {
        let randomBonus, bonus, reward;
        randomBonus = Math.floor(Math.random() * rewards.length);
        bonus = rewards[randomBonus];
        switch (bonus) {
            case 'experience':
                scale = scale * 0.001
                break;
            case 'gold':
                scale = scale * 0.01
                break;
            case 'armor':
                scale = scale * 0.001
                break;
            default:
                return [bonus, scale];
        }
        reward = this.chest.price * scale;
        return [bonus, reward];
    }

    async getChestRewards() {
        let reward = await this.rollChest(this.hero);
        if (reward[2] === 'neutral') {
            return 'A francba, hát nem üres a láda?!';
        } else {
            console.log('reward: ' + reward);
            this.updateHeroPoint(reward[0], Math.round(reward[1]));
            return `Ládát kinyitva nagy meglepetésben részesültél, kaptál: ${reward[0]} * ${Math.round(reward[1])}-t!`;
        }
    }
}
