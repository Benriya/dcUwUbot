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
        let rainCast = ['09', '10', '11'];
        let rain = false;
        for (let i = 0; i <= 7; i++) {
            returnForecast.push(`${weather.list[i].dt_txt.slice(10, 13)} órakkor:   
                               - ${weather.list[i].weather[0].main}
                               - ${weather.list[i].weather[0].description}\n\n`)

            if (rainCast.includes(weather.list[i].weather[0].icon.slice(1, 2))) rain = true;
        }
        fn(returnForecast, rain);
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

/*getWeatherData(function (weather) {
    console.log(weather.list[0].sys);
    console.log(weather.list[0].main);
    console.log(weather.list[0].weather);
    console.log(weather.list[0].clouds);
});*/

