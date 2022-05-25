import func from "../utility/functions";
import {getChart, getForecast} from "../utility/weather";
import database from "../database/handle_database";
import {channelIds, dzsitParticipants, HUF} from "../utility/models";

export async function loadLoop(client) {
    setInterval(async () => {
        let nowDate = new Date();

        if (nowDate.getMinutes() === 0 && nowDate.getHours() === 6) {
            const listEmbed = await func.sendList();
            func.toDiscordMessageChannel(client, '671309309757358123', listEmbed);
            await getForecast(function(weather, rain) {
                func.toDiscordMessageChannel(client, channelIds.weatherChannelId,
                    'Mai napi időjárás jelentésünk következik Szegedről:\n' + weather);
                if (rain === true) {
                    func.toDiscordMessageChannel(client, channelIds.weatherChannelId,
                        '**Mai nap folyamán eső várható**');
                }
            });
            await getChart(function (chartUrl) {
                func.toDiscordMessageChannel(client, channelIds.weatherChannelId,`Chart: ${chartUrl}`);
            });
            await database.resetList();
        }

        if (func.rollTheDice(2) && nowDate.getMinutes() === 0) {
            let channelNum = func.drawOne(channelIds.dzsittChannels);
            let participant = func.drawOne(dzsitParticipants);
            func.toDiscordMessageChannel(client, channelIds.dzsittChannels[channelNum],'Dzsitt ' + dzsitParticipants[participant] + ' <:friedlaugh:886329158198759495>');
        }

        if (nowDate.getMinutes() === 0 && nowDate.getHours() % 3 === 0) {
            const exchange = await func.requestEur();
            const index = exchange.indexOf('rate');
            HUF = exchange.slice(index + 7, index + 13);
        }
    },60 * 1000);
}
