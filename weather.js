import request from 'request';
import dotenv from 'dotenv'
dotenv.config();

let apiKey = process.env.WEATHER_API;
let city = 'Szeged';
let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
//let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

/*export function getWeather(fn) {
    request(url, function (err, response, body) {
        if (err) {
            console.log('error:');
        } else {
            let weather = JSON.parse(body);
            console.log(weather);
            fn(`Mai napi időjárás jelentésünk következik ${weather.name}-ről:
                    - Weather: ${weather.weather[0].description}
                    - Temps: ${weather.main.temp} ºC, Feels like: ${weather.main.feels_like} ºC
                    - Humidity: ${weather.main.humidity}%
                    - Wind Speed: ${weather.wind.speed}, Gust: ${weather.wind.gust}
                    - Visibility: ${weather.visibility}`);
        }
    });
}*/

export function getForecast(fn) {
    request(forecastUrl, function (err, response, body) {
        if (err) {
            console.log('error:');
        } else {
            let weather = JSON.parse(body);
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
        }
    });
}

//getForecast(function(weather) {});
