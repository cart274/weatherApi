import * as express from "express";
import * as fs from "fs"
const log4js = require('../../utils/logger.ts');
const logger = log4js.getLogger('logger');
const axios = require('axios');
const router = express.Router();

router.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
	try{
		let country = req.body.country ? req.body.country : 'AR';
		fs.readFile('./public/city.list.json','utf8', (error, data) => {
			let cities = JSON.parse(data);
			let ArCities = cities.filter(city => city.country === country);
			res.status(200).json({ArCities});
		});
	} catch(error) {
		logger.error(error);
	}
});

router.get('/location', (req: express.Request, res: express.Response, next: express.NextFunction) => {
	axios.get('https://ipapi.co/json/')
	.then(function (response) {
	  logger.debug(response.data);
	  res.status(200).json(response.data);
	})
	.catch(function (error) {
	  logger.error(error);
	})
});

module.exports = router;