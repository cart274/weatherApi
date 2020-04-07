const log4js = require('../../utils/logger.ts');
const logger = log4js.getLogger('logger');
const loggerFile = log4js.getLogger('loggerFile');
const axios = require('axios');
const token:string = '87f8774f6f0dcf2279f896fe8c2c3657';
const lang:string = 'es';
const weatherBaseUrl:string = 'http://api.openweathermap.org/data/2.5/weather';
const dailyWeatherBaseUrl:string = 'http://api.openweathermap.org/data/2.5/forecast';

class Weather {

    getWeather(lat:string, lon:string, cnt?:number) {
        return new Promise((resolve, reject)=> {
            let weatherUrl:string = `${weatherBaseUrl}?lat=${lat}&lon=${lon}&appid=${token}&lang=${lang}`;
            if (cnt > 0) {
                weatherUrl = `${dailyWeatherBaseUrl}?lat=${lat}&lon=${lon}&appid=${token}&lang=${lang}&cnt=${cnt}`;
            }
            axios.get(weatherUrl)
            .then(function (response) {
                resolve(response.data);
            })
            .catch(function (error) {
                logger.error(error);
                loggerFile.error(error);
                reject(error)
            })
        })
    }

}


export { Weather };