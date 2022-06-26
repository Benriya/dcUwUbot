import func from "../utility/functions.js";
import {pinger, HUF, szerbs, UwU} from "../utility/models.js";
import Pagination from "discord-paginationembed";
import database from "../database/handle_database.js";
import { cli } from "winston/lib/winston/config/index.js";
import { Errors } from "../Throws/errors.js";

export async function loadCommon(client, msg, firstMention) {
    const err = new Errors();
    const author = msg.author.id;
    const args = msg.content.substring(1).split(' ');
    const cmd = args[0];

    await client.user.setActivity(`1 Euro = ${HUF} Ft`);

    if (msg.content.substring(0, 1) === '!') {
        let sentence = msg.content.slice(5);
        let nickname = args[1];

        console.log(Date() + ": " + cmd.toLocaleLowerCase());

        if(cmd.toLocaleLowerCase() !== 'kivagy' && cmd.toLocaleLowerCase() !== 'votenick' && cmd.toLocaleLowerCase() !== 'votemute') {
            if (sentence !== undefined) {
                if (sentence.includes('@')) {
                    return;
                }
            }
            if (args[1] !== undefined) {
                if (args[1].includes('@')) {
                    return;
                }
            }
        }
    switch (cmd.toLocaleLowerCase()) {
        case 'praise':
            func.toDiscordMessage(client, msg, nickname + '<:head:767421798786138154>\n' + '<:hand:767421873360601168>' + '<:face:767421929366749184>');
            break;
        case 'kurai':
            await msg.delete();
            func.toDiscordMessage(client, msg, func.randomLongMessage(['A', 'S', 'D', '?', ':', '\_'], Math.floor(Math.random() * 50 + 20)));
            break;
        case 'amecu':
        case 'ametsu':
            await msg.delete();
            func.toDiscordMessage(client, msg, func.randomLongMessage(['<:monkayay:806119728359145512>', '<:harold:806119762764496949>', '<:sadcat:806119685145231391>'], Math.floor(Math.random() * 10 + 3)));
            break;
        case 'vonzalom':
            await msg.delete();
            func.toDiscordMessage(client, msg, func.randomLongMessage(['<:monkayay:806119728359145512>', '<:catblep:897797757539061780>', '<:kappa:897797802745270302>'], Math.floor(Math.random() * 10 + 3)));
            break;
        case 'akurva':
            func.sendAttachment('./szerb/akurva.mp4', client, msg);
            break;
        case 'rule':
            func.sendAttachment('./rule.png', client, msg);
            break;
        case 'hirling':
            func.sendAttachment('./szerb/hirling.png', client, msg);
            break;
        case 'faszom':
            func.sendAttachment('./szerb/picsaba.png', client, msg);
            break;
        case 'micsinalsz':
            func.sendAttachment('./szerb/micsinalsz.png', client, msg);
            break;
        case 'csokas':
            func.sendAttachment('./szerb/csokas.png', client, msg);
            func.sendAttachment('./szerb/fasszopokas.png', client, msg);
            break;
        case 'monke':
            func.sendAttachment('./szerb/monke.png', client, msg);
            break;
        case 'ugood':
            func.sendAttachment('./szerb/ugood.jpg', client, msg);
            break;
        case 'vicci':
            func.sendAttachment('./szerb/vicci.jpg', client, msg);
            break;
        case 'gay':
            func.sendAttachment('./szerb/gay.jpg', client, msg);
            break;
        case 'szepi':
        case 'pisti':
            func.sendAttachment('./szerb/inevitable.png', client, msg);
            break;
        case 'alma':
            func.sendAttachment('./szerb/alma.png', client, msg);
            break;
        case 'punch':
            func.sendAttachment('./szerb/punch.mov', client, msg);
            break;
        case 'uwu':
            func.sendAttachment('./szerb/uwu.gif', client, msg);
            if (args[1] !== undefined && args[1] === "assemble") {
                func.sendAttachment('./szerb/assemble.gif', client, msg);
            }
            break;
        case 'assemble':
            func.sendAttachment('./szerb/assemble.gif', client, msg);
            break;
        case 'kurva':
            func.sendAttachment('./szerb/kurvaaaa.mp3', client, msg);
            break;
        case 'kussoljmár':
            func.sendAttachment('./szerb/kussoljmar.mp3', client, msg);
            break;
        case 'springboot':
            func.sendAttachment('./szerb/springbooooot.mp4', client, msg);
            break;
        case 'medikiakad':
            func.sendAttachment('./szerb/medimadi.mp4', client, msg);
            break;
        case 'nemtudom':
            await msg.delete();
            func.sendAttachment('./szerb/nemtudom.png', client, msg);
            break;
        case 'mav':
            func.sendAttachment('./szerb/mav.jpeg', client, msg);
            break;
        case 'list':
            await msg.delete();
            const listEmbed = await func.sendList();
            func.toDiscordMessage(client, msg, listEmbed);
            break;
        case '!help':
            /*let commands = func.getCommands();
            let FieldsEmbed = new Pagination.FieldsEmbed()
                .setArray(commands)
                .setAuthorizedUsers([msg.author.id])
                .setChannel(msg.channel)
                .setElementsPerPage(1)
                .setPage(1)
                .setPageIndicator(true)
                .formatField('Parancsok', i => i.Parancsok)
                .setTimeout(600000000)
                .setDeleteOnTimeout(false)
                .setEmojisFunctionAfterNavigation(false);

            FieldsEmbed.embed
                .setColor(0xFF00AE)
                .setDescription('Nesztek itt vannak a parancsok pupákok');

            await FieldsEmbed.build();
            func.toDiscordMessage(client, msg, {embeds: [FieldsEmbed]});*/
            msg.reply({embeds: [err.underConstruction()]});
            break;
        case 'kivagy':
            let image;

            if (szerbs.includes(firstMention.id)) {
                image = './szerb/szerb_1.jpg';
            } else if (firstMention.id === UwU.Ninja) {
                image = './szerb/TAP.png';
            } else {
                image = './szerb/szerb_0.jpg';
            }
            func.sendAttachment(image, client, msg);
            break;
        case 'csicskawall':
            let csicskawall = func.getCsicskawall();
            func.toDiscordMessage(client, msg, csicskawall);
            break;
        case 'aranywall':
            let aranywall = func.getAranywall();
            func.toDiscordMessage(client, msg, aranywall);
            break;
        case 'geci':
            await msg.delete();
            func.toDiscordMessage(client, msg, 'oh igen' + sentence);
            func.toDiscordMessage(client, msg, '<a:yourmom:787410945541537842>');
            break;
        case 'mock':
            await msg.delete();
            func.toDiscordMessage(client, msg, '<a:retard:788703547335901184>');
            func.toDiscordMessage(client, msg, func.retardinator(sentence));
            func.toDiscordMessage(client, msg, '<a:retard:788703547335901184>');
            break;
        case 'votemute':
            /*await msg.react('👍');
            msg.awaitReactions(func.voteMuteFilter, { max: 1, time: 10000, errors: ['time']})
                .then(async () => {
                    let mute_role = msg.guild.roles.cache.get("686288799109480523");
                    await firstMention.roles.add(mute_role);
                    await func.toDiscordMessage(client, msg, 'Muteolva');
                    setTimeout(() => {firstMention.roles.remove(mute_role);
                    }, 30 * 1000);
                }).catch(r => {
                func.toDiscordMessage(client, msg, error.deniedVote());
                console.log(r);
            });*/
            msg.reply({embeds: [err.underConstruction()]});
            break;
        case 'votenick':
            /*try{
                if (firstMention.roles.cache.has('671107459858956299')) {
                    func.toDiscordMessage(client, msg,'Botot nem nevezhetsz át');
                    break;
                }
            } catch (err){
                console.log('error');
            }
            await msg.react('👍');
            msg.awaitReactions(func.voteNickFilter, { max: 1, time: 30000, errors: ['time']})
                .then( () => {
                    firstMention.setNickname(nickname, 'Sikeres Szavazás');
                    func.toDiscordMessage(client, msg,'Sikeres átnevezés: ' + firstMention.user.username);
                }).catch(r => {
                func.toDiscordMessage(client, msg, error.deniedVote());
                console.log(r);
            });*/
            msg.reply({embeds: [err.underConstruction()]});
            break;
        case 'sub':
            pinger = await func.checkIfPingerSub(nickname, author);
            if (nickname !== undefined && !pinger) {
                database.subscribeForPing(nickname, author);
                func.toDiscordMessage(client, msg, 'Feliratkozál teszt pingre: ' + nickname);
            }
            break;
        case 'unsub':
            pinger = await func.checkIfPingerSub(nickname, author);
            if (nickname !== undefined && pinger) {
                database.unsubscribeForPing(nickname, author);
                func.toDiscordMessage(client, msg, 'Leiratkoztál teszt pingről: ' + nickname);
            }
            break;
        case 'come':
            pinger = await func.checkIfPingerSub(nickname, author);
            if (nickname !== undefined && pinger) {
                let pings = await func.getPingUsers(nickname);
                func.toDiscordMessage(client, msg, pings);
            }
            break;
        case 'risus':
            await msg.delete();
            func.toDiscordMessage(client, msg, `<:leave:839585675002642452> <#${func.getChannel(args[1])}>`);
            break;
        case 'aztakurva':
            await msg.delete();
            func.toDiscordMessage(client, msg, "<:react:905522849014485093> 📢  🇦 🇿 🇹 🇦   🇰 🇺 🇷 🇻 🇦");
            break;
    }
}
}
