import Discord from 'discord.js';

export class Monster {
    monster;

    constructor(monster) {
        this.monster = monster;
    }

    getMonster() {
        return this.monster;
    }

    getMonsterEmbed() {
        return new Discord.MessageEmbed()
            .setColor('#850000')
            .setTitle(`[${this.monster.name}] LvL: ${this.monster.level}`)
            .setThumbnail(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcg2z-7M1BLuu4WbVKYQzv8Ya30gb5-b5n4Q&usqp=CAU`)
            .setAuthor(`Monster`)
            .addField('Status: ',
                `HP: ${this.monster.hp}/${this.monster.maxHp}\n` +
                `Armor: ${this.monster.armor}`)
            .addField('Faj: ',
                `${this.monster.race}`, true)
            .addField('Leírás: ',
                `*${this.monster.description}*`, true)
            .addField('Stats: ',
                `Power: ${this.monster.strength}\n` +
                `Intellect: ${this.monster.intellect}\n` +
                `Agility: ${this.monster.agility}\n` +
                `Defense: ${this.monster.defense}\n` +
                `Gold: ${this.monster.gold}`)
            .addField('Experience: ',
                `${this.monster.experience}xp`, true)
            .addField('Nehézség: ',
                `${this.monster.diff}`, true);
    }

    makeAttack() {
        let attackTypes;
        if (this.monster.mage) return 'magic';
        attackTypes = ['weak', 'mid', 'heavy'];
        return attackTypes[Math.floor(Math.random() * 3)];
    }
}
