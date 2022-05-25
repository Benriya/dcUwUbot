import database from '../database/handle_database.js';
import Discord from 'discord.js';
import stringSimilarity from "string-similarity";
import fetch, {Headers} from "node-fetch";
import {voters} from "./models.js";

export default {
    getChannel(channel) {
        switch (channel) {
            case 'lotto':
                return '779395227688501298';
            
            case 'altalanowos':
                return '661569831111491618';
            
            case '18':
                return '667779656363278367';
            
            case 'kuwuka':
                return '671309309757358123';
            
            case 'owoff':
                return '667783025811259448';
            
            case 'so':
                return '839885997923237889'
            
            case 'mowozi':
                return '699657394506170469';
            
            case 'muwusic':
                return '776803915898552320';
            
            case 'suwuli':
                return '706776570836156426';
            
            case 'jatekowos':
                return '713415837356392508';
            
            default:
                return '667783025811259448';
        }
    },

    getCsicskawall() {
        return '┌───── •✧Wall Of Csicska✧• ─────┐\n' +
            '      Bánhelyi Balázs\n' +
            '      **BigBlueButton**\n' +
            '      ***C s e n d e s  T i b o r***\n' +
            '      Csókás Eszter\n' +
            '      Gazdag-Tóth Boglárka Dr.\n' +
            '      Gingl Zoltán\n' +
            '      Hirling Dominik\n' +
            '      Jász Judit\n' +
            '      Katona Melinda\n' +
            '      Kaposvári Dániel\n' +
            '      **Kulin Julia**\n' +
            '      **Makan Gergely**\n' +
            '      Márkus András\n' +
            '      Pletl Szilveszter Dr.\n' +
            '      London András\n' +
            '      Vida Ágnes\n' +
            '└───── •✧✧✧✧✧✧✧✧✧✧• ─────┘';
    },

    getAranywall()  {
        return '┌──── •✧Wall Of Aranyember✧• ────┐\n' +
            '      Antal Gábor\n' +
            '      Balogh András\n' +
            '      Cservenák Bence\n' +
            '      Gazdag Zsolt\n' +
            '      Győrffy Lajos\n' +
            '      Heinc Emília\n' +
            '      Kátai Kamilla\n' +
            '      Kardos Péter\n' +
            '      Kardos Péter Dr.\n' +
            '      Fülöp Vanda\n' +
            '      Keleti Márton\n' +
            '      Kicsi András\n' +
            '      Kunos Ádám\n' +
            '      ***Maróti Miklós***\n' +
            '      Szabó Tamás\n' +
            '      Szabolcs Iván\n' +
            '└────── •✧✧✧✧✧✧✧✧✧• ──────┘';
    },

    getCommands() {
        return [
            { Parancsok: '`!votemute "tag":` (tag helyére tageld meg akit muteolni akarsz 30 sec-re aposztrófok nélkül), meg kell szavazni, 3 szavazat után érvényes. Admint, és botot nem muteolhatsz! \n\n' +
                    '`!votenick "nicknév" "tag:` nicknév helyére beírod a kívánt nevet, és tageled akinek a nevét meg akarod változtatni, ehhez 6 szavazat kell, hogy sikeres legyen.\n\n' +
                    '`!praise + "emote" vagy "szöveg":` isteni magaslatba emelem azt amit megadtál\n\n' +
                    '`!kivagy + "tag":` megmondja hogy te ki is vagy valójában. \n\n' +
                    '`!csicskawall:` kilistázom a csicska tanárokat\n\n' +
                    '`!aranywall:` kilistázom aranyember tanárokat'},
            { Parancsok: '`!ametsu/!amecu:` ametsu kedvenc emote-jait küldöm be\n\n' +
                    '`!geci + "valami":` meg dingi-dongizom\n\n' +
                    '`!mock + "valami":` retard spongyabobként beszélek\n\n' +
                    '`!kurai:` elküldöm karcsi által szeretett vicces reagálást\n\n' +
                    '`!list:`, Megtekintheted a napi kötelező szövegek listája hogy halad.\n\n' +
                    '`!pisti/!szepi:` pisti az elkerülhetetlen\n\n' +
                    '`!medikiakad:` prezentálim mi van akkor, ha MediMadi kiakad'},
            { Parancsok: '`!kurva:` Swarci ordít egyet\n\n' +
                    '`!nemtudom:` miért nem lehet tudod? Csalódtam.\n\n' +
                    '`!assemble:` UwU egyesülj!\n\n' +
                    '`!micsinalsz:` Mégis mit csinálsz??\n\n' +
                    '`!faszom:` oh bazdmeg még ez is van\n\n' +
                    '`!uwu:` strong together'},
            { Parancsok: '`!springboot:` Oooo spring BOOT\n\n' +
                    '`!vicci:` de vicci vagy\n\n' +
                    '`!monke:` Return monke\n\n' +
                    '`!rule:` A legfőbb szabály\n\n' +
                    '`!csokas:` Aki fasszopókás\n\n' +
                    '`!hirling:` Mit csinál vajon javítás helyett?'},
            { Parancsok: '`!gay:` Teátrális buzi vagy\n\n' +
                    '`!sub + "teszttel rendelkező kurzus":` Feliratkozhatsz olyan ping csoportba, ahol ezt a tesztet töltik ki\n\n' +
                    '`!unsub + "teszttel rendelkező kurzus":` Leiratkozol a pingekről\n\n' +
                    '`!teszt + "kurzus":` Akik fel vannak iratkozva a kurzusra azokat megpingelem\n\n' +
                    '`!risus + "channel név":` Tipik risusing csak te nem használhatod ezt'},
            { Parancsok: '`!bullshit:` Ez bikaszar\n\n' +
                    '`!punch:` Megcsaplak\n\n' +
                    '`!ugood:` U good? no...\n\n' +
                    '`!vonzalom:` Cringe vonzalom emote-ok\n\n' +
                    '`!aztakurva:` Tamás aztakurva aranyköpése\n\n' +
                    '`!akurva:` A kurva anyád\n\n'},
            { Parancsok: '`"bully"` a szövegben, akkor lespriccelem a másikat.\n\n' +
                    '`"no bully"` a szövegben azt eredményezi hogy egy stop képet küldök, az abuse megszüntetésére.\n\n' +
                    '`Ha 3x beküldik ugyanazt, akkor megismétlem`\n\n' +
                    '`baszadékra szopadékot írok, és fordítva`\n\n' +
                    '`medishug-ra madishrugot küldök és fordítva`\n\n' +
                    '`brc van a szövegben brc-t reactolok`\n\n' +
                    '`maroti, maróti, dimat van a szövegben marótit reactolok`\n\n' +
                    '`megcsap, nem mered, nem leszek-re is reactolok`'},
        ];
    },

    checkIfSame(array) {
        if (array[0].author.bot || array[1].author.bot || array[2].author.bot) {
            return false;
        }
        if (array[0].author !== array[1].author &&
            array[1].author !== array[2].author &&
            array[0].author !== array[2].author &&
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
        return client.channels.cache.get(msg.channel.id).send(attachment);
    },

    toDiscordMessage(client, msg, message) {
        client.channels.cache.get(msg.channel.id).send(message);
    },

    toDiscordMessageChannel(client, channelId, message) {
        client.channels.cache.get(channelId).send(message);
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
