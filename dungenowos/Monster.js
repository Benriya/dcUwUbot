import database from "../database/handle_database";
import func from "../functions";

const Discord = require("discord.js");

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
            .addField('Race: ',
                `${this.monster.race}`)
            .addField('Description: ',
                `*${this.monster.description}*`)
            .addField('Stats: ',
                `Power: ${this.monster.Power}\n` +
                `Intellect: ${this.monster.Intellect}\n` +
                `Agility: ${this.monster.Agility}`)
            .addField('Experience: ',
                `${this.monster.experience}xp`)
            .addField('Difficult: ',
                `${this.monster.diff}`);
    }
}
