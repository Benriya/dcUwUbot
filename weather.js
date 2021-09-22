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
                               - Végül a szél ereje: ${weather.list[i].wind.speed} km/h
                               - és a széllökéseké: ${weather.list[i].wind.gust} km/h\n\n`)
        }
        fn(returnForecast);
    });
}

export function getChart(fn) {
    let maximum = -10;
    getWeatherData(async function (weather) {
        let dateArray = [];
        let temperatureArray = [];
        for (let i = 0; i <= 7; i++) {
            let weatherDate = weather.list[i].dt_txt;
            dateArray.push(`${weatherDate.slice(10, 13)}`);
            temperatureArray.push(`${Math.round(weather.list[i].main.temp)}`);
            if (maximum < Math.round(weather.list[i].main.temp)) maximum = Math.round(weather.list[i].main.temp);
        }

        const chart = new QuickChart();
        chart
            .setConfig({
                type: 'line',
                data: {
                    labels: dateArray,
                    datasets: [{ label: 'Hőmérséklet',
                        fill: false,
                        lineTension: 0.4,
                        radius: 5,
                        backgroundColor: ['rgb(255,52,52)'],
                        borderColor: ['rgb(255,26,26)'],
                        data: temperatureArray }]
                },
                options: {
                    plugins: {
                        datalabels: {
                            anchor: 'end',
                            align: 'top',
                            color: '#000000',
                            font: {
                                size: 40,
                            },
                            borderColor: 'rgb(0,0,0)',
                            borderWidth: 1,
                            borderRadius: 5,
                        },
                    },
                    legend: {
                        display: false,
                    },
                    scales: {
                        y: {

                        },
                        yAxes: [
                            {
                                ticks: {
                                    fontSize: 40,
                                    fontFamily: 'Serif',
                                    fontStyle: 'italic',
                                    suggestedMax: maximum + 1
                                },
                            },
                        ],
                        xAxes: [
                            {
                                ticks: {
                                    fontSize: 35,
                                    fontFamily: 'Serif',
                                    fontStyle: 'italic',
                                },
                            },
                        ],
                    },
                },
            })
            .setWidth(1280)
            .setHeight(720);

        console.log(chart.getUrl())

        let url = await chart.getShortUrl()
        fn(url);
    });

}

