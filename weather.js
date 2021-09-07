import request from 'request';

let apiKey = 'f84fc6a315ba87bf3c4b139260d14b7d';
let city = 'Szeged';
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
export function getWeather(fn) {
    request(url, function (err, response, body) {
        if (err) {
            console.log('error:');
        } else {
            let weather = JSON.parse(body);
            fn(`Mai napi időjárás jelentésünk következik ${weather.name}-ről:
                    - Weather: ${weather.weather[0].description}
                    - Temps: ${weather.main.temp} ºC, Feels like: ${weather.main.feels_like} ºC
                    - Humidity: ${weather.main.humidity}%
                    - Wind Speed: ${weather.wind.speed}, Gust: ${weather.wind.gust}
                    - Visibility: ${weather.visibility}`);
        }
    });
}
