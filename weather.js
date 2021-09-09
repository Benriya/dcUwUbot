import request from 'request';
import QuickChart from "quickchart-js";
import dotenv from 'dotenv'

dotenv.config();

let apiKey = process.env.WEATHER_API;
let city = 'Szeged';
let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

function getWeatherData(fn) {
    request(forecastUrl, function (err, response, body) {
        if (err) {
            console.log('error:');
        } else {
            let weather = JSON.parse(body);
            fn(weather);
        }
    });
}

export function getForecast(fn) {
    getWeatherData(function (weather) {
        let returnForecast = [];
        for (let i = 0; i <= 6; i+=2) {
            returnForecast.push(`${weather.list[i].dt_txt} időben a várható
                               - Hőmérséklet: ${weather.list[i].main.temp} ºC
                               - Amilyennek érződik: ${weather.list[i].main.feels_like} ºC
                               - Páratartalom: ${weather.list[i].main.humidity}%
                               - Az ég: ${weather.list[i].weather[0].description}
                               - Végül a szél ereje: ${weather.list[i].wind.speed}
                               - és a széllökéseké: ${weather.list[i].wind.gust}\n\n`)
        }
        fn(returnForecast);
    });
}

export function getChart(fn) {
    getWeatherData(async function (weather) {
        let dateArray = [];
        let temperatureArray = [];
        for (let i = 0; i <= 7; i++) {
            dateArray.push(`${weather.list[i].dt_txt}`);
            temperatureArray.push(`${weather.list[i].main.temp}`);
                               /*- Hőmérséklet: ${weather.list[i].main.temp} ºC
                               - Amilyennek érződik: ${weather.list[i].main.feels_like} ºC
                               - Páratartalom: ${weather.list[i].main.humidity}%
                               - Az ég: ${weather.list[i].weather[0].description}
                               - Végül a szél ereje: ${weather.list[i].wind.speed}
                               - és a széllökéseké: ${weather.list[i].wind.gust}\n\n`)*/
        }
        const chart = new QuickChart();
        chart
            .setConfig({
                type: 'bar',
                data: { labels: dateArray, datasets: [{ label: 'Hőmérséklet', data: temperatureArray }] },
            })
            .setWidth(1280)
            .setHeight(720);

        console.log(chart.getUrl())

        let url = await chart.getShortUrl()
        fn(url);
    });

}

