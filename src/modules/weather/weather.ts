const log4js = require('../../utils/logger.ts');
const logger = log4js.getLogger('logger');
const loggerFile = log4js.getLogger('loggerFile');
const axios = require('axios');
const token:string = '7f3d52255b4c3d86edbbfd5e5c5944dc';

class Weather {

    getCurrentWeather(lat:string, lon:string) {
        return new Promise((resolve, reject)=> {
            const weatherUrl:string = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${token}&lang=es`;
            axios.get(weatherUrl)
            .then(function (response) {
              logger.debug(response.data);
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