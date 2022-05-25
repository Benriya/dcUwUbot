import func from "../utility/functions.js";
import {HUF} from "../utility/models.js";

export async function loadAdmin(client, msg, messageChannel) {
    if (msg.content.substring(0, 1) === '.' && (messageChannel === '704983142452428933' || messageChannel === '786140249809354793')) {
        let args = msg.content.substring(1).split(' ');
        let cmd = args[0];
        let channel = args[1];

        let channelId = func.getChannel(channel);
        await msg.delete();
        let sentence = msg.content.slice(5);
        switch (cmd.toLocaleLowerCase()) {
            case 'help':
                func.toDiscordMessage(client, msg, 'Elérhető kommandok:\n ".say" + "channel név" + "szöveg" -> az adott channel-re a szöveget kiírja\n' +
                    'elérhető channelek: "lotto", "altalanowos", "18", "kuwuka",  "owoff" (ezt nem kötelező kiírni), "so", "mowozi", "muwusic", "suwuli", "jatekowos"\n' +
                    'tagelni tudsz embert, ha beírod az id-ját ide: <@*id*>\n' +
                    'channel-t "tagelni" hasonlóan, az id-jával: <#*id*>\n' +
                    '.sup <:surp:708969952354500658>\n.tri <:trigger:708979797895938168>\n.cute <:cute:735574079851200582>\n' +
                    '.on_no <:oh_no:735574451088785498>\n.gimme <:gimme:744540992430145586>\n.simp <:simp:744540966215483442>\n' +
                    '.burn <:burn:744540895478808626>\n.ew <:ew:744540932967235674>\n.nameselj <:marotihaha:759804122139983873>\n' +
                    '.hmm <:pepehmm:780723259355824128>\n.dayum <:dayum:785148917326675998>\n.fuck <a:yourmom:787410945541537842>\n' +
                    '.kikerdezte <a:whoasked:719267371029889168>');
                break;
            case 'say':
                if (channelId === '667783025811259448') {
                    func.toDiscordMessageChannel(client, channelId, sentence);
                } else {
                    func.toDiscordMessageChannel(client, channelId, sentence.slice(channel.length + 1));
                }
                break;
            case 'eur':
                const exchange = await func.requestEur();
                const index = exchange.indexOf('rate');
                HUF = exchange.slice(index + 7, index + 13);
                break;
            case 'sup':
                func.toDiscordMessageChannel(client, channelId, '<:surp:708969952354500658>');
                break;
            case 'tri':
                func.toDiscordMessageChannel(client, channelId, '<:trigger:708979797895938168>');
                break;
            case 'cute':
                func.toDiscordMessageChannel(client, channelId, '<:cute:735574079851200582>');
                break;
            case 'gimme':
                func.toDiscordMessageChannel(client, channelId, '<:gimme:744540992430145586>');
                break;
            case 'exist':
                func.toDiscordMessageChannel(client, channelId, '<:existing:806124020813791233>');
                break;
            case 'simp':
                func.toDiscordMessageChannel(client, channelId, '<:simp:744540966215483442>');
                break;
            case 'ew':
                func.toDiscordMessageChannel(client, channelId, '<:ew:744540932967235674>');
                break;
            case 'haha':
                func.toDiscordMessageChannel(client, channelId, '<a:haha:826381536256589834>');
                break;
            case 'burn':
                func.toDiscordMessageChannel(client, channelId, '<:burn:744540895478808626>');
                break;
            case 'nameselj':
                func.toDiscordMessageChannel(client, channelId, '<:marotihaha:759804122139983873>');
                break;
            case 'hmm':
                func.toDiscordMessageChannel(client, channelId, '<:pepehmm:780723259355824128>');
                break;
            case 'dayum':
                func.toDiscordMessageChannel(client, channelId, '<:dayum:785148917326675998>');
                break;
            case 'fuck':
                func.toDiscordMessageChannel(client, channelId, '<a:yourmom:787410945541537842>');
                break;
            case 'kikerdezte':
                func.toDiscordMessageChannel(client, channelId, '<a:whoasked:719267371029889168>');
                break;
        }
    }
}
