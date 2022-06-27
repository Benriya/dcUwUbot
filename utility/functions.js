import database from '../database/handle_database.js';
import Discord from 'discord.js';
import stringSimilarity from "string-similarity";
import fetch, {Headers} from "node-fetch";
import {aranywallText, channelIds, csicskawallText, helpList, voters} from "./models.js";

export default {
    getChannel(channel) {
        switch (channel) {            
            case 'altalanowos':
                return channelIds.altalanowosId;
            
            case '18':
                return channelIds.pluwusId;
            
            case 'kuwuka':
                return channelIds.kuwukaId;
            
            case 'owoff':
                return channelIds.owoffId;
            
            case 'so':
                return channelIds.sowogodorId;
            
            case 'mowozi':
                return channelIds.mowoziId;
            
            case 'muwusic':
                return channelIds.muwusicId;
            
            case 'suwuli':
                return channelIds.suwuliId;
            
            case 'jatekowos':
                return channelIds.jatekowosId;
            
            default:
                return channelIds.owoffId;
        }
    },

    getCsicskawall() {
        return csicskawallText;
    },

    getAranywall()  {
        return aranywallText;
    },

    getCommands() {
        return helpList;
    },

    checkIfSame(array) {
        if (array[0].author.bot || array[1].author.bot || array[2].author.bot) {
            return false;
        }
        if (array[0].author.username !== array[1].author.username &&
            array[1].author.username !== array[2].author.username &&
            array[0].author.username !== array[2].author.username &&
            array[0].content === array[1].content &&
            array[1].content === array[2].content) {
            return true;
        }
    },

    randomLongMessage(array, random) {
        let returnSzoveg = '';

        for (let i = 0; i < random; i++) {
            returnSzoveg += array[Math.floor(Math.random() * array.length)];
        }
        return returnSzoveg;
    },

    retardinator(sentence) {
        let splittedSentence = sentence.toLowerCase().split("");
        for (let i = 1; i < splittedSentence.length; i+=2) {
            splittedSentence[i] = splittedSentence[i].toUpperCase();
        }
        splittedSentence = splittedSentence.join("");
        return splittedSentence;
    },

    sendAttachment(image, client, msg) {
        let attachment = new Discord.MessageAttachment(image);
        return client.channels.cache.get(msg.channel.id).send({files: [attachment]});
    },

    toDiscordMessage(client, msg, message) {
        return client.channels.cache.get(msg.channel.id).send(message);
    },

    toDiscordMessageChannel(client, channelId, message) {
        return client.channels.cache.get(channelId).send(message);
    },

    async getPingUsers(nickname) {
        let returnArray = [];
        let ping = await database.getAllSubscriber(nickname);
        for (let i = 0; i < ping.length; i++) {
            returnArray.push('<@' + ping[i].id + '>');
        }

        return returnArray;
    },

    async checkIfPingerSub(kurzus, author) {
        let result = await database.getPinger(kurzus, author);
        return result !== null;
    },

    async updateHufPeak(newHuf) {
        const peak = await database.getHUF();
        const hufNumber = parseFloat(newHuf);
        if (!isNaN(hufNumber)) {
            if (peak[0].HUF < hufNumber) {
                await database.updateHUF(hufNumber);
            }
        }
    },

    rollTheDice(luck) {
        let dice = Math.floor(Math.random() * 100) + 1;
        if (dice <= luck) return true;
    },

    drawOne(array) {
        return Math.floor(Math.random() * array.length);
    },

    isSimilar(input, expected) {
        return stringSimilarity.compareTwoStrings(input, expected);
    },

    async sendList() {
        const checkList = await database.getList();
        const embed = new Discord.MessageEmbed()
            .setColor('#2a5fff')
            .setTitle('UwU TODO list:');
        for (let data in checkList) {
            embed.addField(checkList[data].Line, checkList[data].Checked ? ' ✅' : ' ❌', true);
        }

        return embed;
    },

    async requestEur() {
        let exchange;
        const myHeaders = new Headers();
        myHeaders.append("apikey", process.env.EXCHANGE_API);

        const requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: myHeaders
        };

        await fetch("https://api.apilayer.com/exchangerates_data/convert?to=HUF&from=EUR&amount=1", requestOptions)
            .then(response => response.text())
            .then(result => exchange = result)
            .catch(error => console.log('error', error));
        return exchange;
    },

    voteMuteFilter(reaction, user) {
        if (['👍'].includes(reaction.emoji.name)) {
            if (!voters.includes(user.id)) {
                voters.push(user.id);
                console.log('pushed');
            }
        }else {
            console.log(reaction.emoji.name);
        }
        if (voters.length === 3) {
            voters = [];
            return true;
        }
    },

     voteNickFilter(reaction, user) {
        if (['👍'].includes(reaction.emoji.name)) {
            if (!voters.includes(user.id)) {
                voters.push(user.id);
                console.log('pushed');
            }
        }
        if (voters.length === 4) {
            voters = [];
            return true;
        }
    }
};
