import func from "../utility/functions.js";
import { likingReplies, channelIds } from "../utility/models.js";

export async function loadReply(client, msg, messageChannel, firstMention) {
    const attachment = (msg.attachments).array();
    if (msg.attachments.size > 0) {
        func.toDiscordMessageChannel(client, '745317754256490567', `${attachment[0].proxyURL} id: ${attachment[0].id}`);
    }

    if (msg.content === 'ping') {
        await msg.reply('Pong!');
    }

    if (channelIds.noSpamChannels.includes(messageChannel) && msg.attachments.size === 0) {
        await msg.delete();
        return;
    }

    if (likingReplies.includes(msg.content.toLowerCase())) {
        msg.reply('Tetszésedet/nem tetszésedet reakció formájában fejezd ki, így a spam is mértéke is csökken.')
    }

    if (func.isSimilar(msg.content.toLowerCase(), 'morning gang') > 0.7) {
        let answer = func.rollTheDice(50) ? 'Jó reggelt a faszom <:cuckruce:905801596238200852>' : 'Jó reggelt neked is <:pepeBlush:814526168468160532>';
        func.toDiscordMessage(client, msg, answer);
    }

    if (func.isSimilar(msg.content.toLowerCase(), 'baszadék') > 0.7) {
        func.toDiscordMessage(client, msg, 'Szopadék');
    } else if (func.isSimilar(msg.content.toLowerCase(), 'szopadék') > 0.7) {
        func.toDiscordMessage(client, msg, 'Baszadék');
    }

    if (msg.content.toLowerCase().includes('medishrug')) {
        func.toDiscordMessage(client, msg, '<:madishrug:788328467485032458>');
    } else if (msg.content.toLowerCase().includes('madishrug')) {
        func.toDiscordMessage(client, msg, '<:medishrug:788328451550871552>');
    }

    if (msg.content.toLowerCase().includes('no bully')) {
        func.toDiscordMessage(client, msg, 'https://i.pinimg.com/originals/78/e3/6c/78e36c8c096aeb13b46a3b41cd934c9f.jpg');
    }

    if (msg.content.toLowerCase().includes('maróti') || msg.content.toLowerCase().includes('dimat')
        || msg.content.toLowerCase().includes('aranyember')) {
        await msg.react('759804122139983873');
    }

    if (msg.content.toLowerCase().includes('brc')) {
        await msg.react('907560400722231328');
    }

    if (func.isSimilar(msg.content.toLowerCase(), 'megcsap') > 0.8) {
        func.toDiscordMessage(client, msg, '<a:uwu_flotespanking:677984852963885075>');
    }

    if (func.isSimilar(msg.content.toLowerCase(), 'nem mered') > 0.7) {
        func.toDiscordMessage(client, msg, 'hang vaaaagy');
    }

    if (msg.content.toLocaleLowerCase().includes('nem leszek')) {
        func.toDiscordMessage(client, msg, 'Miért nem leszel? ( ._.) Lehet páran örülnének neki...');
    }

    if (msg.content.toLocaleLowerCase() === 'ok') {
        if (func.rollTheDice(10)) {
            func.toDiscordMessage(client, msg, '"k" legalább csináld rendesen');
        }
    }

    if (func.isSimilar(msg.content.toLowerCase(), 'u u uá uá') > 0.7) {
        func.toDiscordMessage(client, msg, '<a:spongebob_dansen:920612079751294986>');
    }

    if (msg.content.includes('facebook.com') || msg.content.includes('fb.watch')) {
        func.sendAttachment('./szerb/lost_face.png', client, msg);
    }

    if (func.isSimilar(msg.content.toLowerCase(), 'komédia arany') > 0.7) {
        func.sendAttachment('./szerb/komedi.png', client, msg);
    }

    try {
        if (firstMention.user.username === 'Pearly') {
            func.toDiscordMessage(client, msg, 'Szeretnél valamit?');
        }
    }catch (e) {

    }
}
