import * as fs from "fs"
const log4js = require('../../utils/logger.ts');
const logger = log4js.getLogger('logger');
const axios = require('axios');

class Cities {

	getAllCities(country:string = 'AR') {
		return new Promise(function(resolve, reject){
			try{
				logger.trace(country);
				fs.readFile('./public/city.list.json','utf8', (error, data) => {
					let cities = JSON.parse(data);
					resolve(cities.filter(city => city.country === country));
				});
			} catch(error) {
				logger.error(error);
				reject(error);
			}
		})
	}

	getCurrentLocation() {
		return new Promise(function(resolve, reject){
			axios.get('https://ipapi.co/json/')
			.then(function (response) {
				logger.debug(response.data);
				resolve(response.data);
			})
			.catch(function (error) {
				logger.error(error);
				reject(error);
			})
		})
	}
}

export {Cities};