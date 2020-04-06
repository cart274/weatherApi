import * as express from "express";
const router = express.Router();
import {Weather} from './weather';
const weather = new Weather();

router.get('/current', (req: express.Request, res: express.Response, next: express.NextFunction) => {	
	const lat:string = req.query.lat;
	const lon:string = req.query.lon;
	if (!lat || !lon) {
		res.status(400).json('Bad request');
	}
	weather.getCurrentWeather(lat, lon)
		.then((currentWeather) => res.status(200).json({currentWeather}))
		.catch((error) => res.status(502).json(error));
});

router.get('/forecast', (req: express.Request, res: express.Response, next: express.NextFunction) => {	
	const lat:string = req.query.lat;
	const lon:string = req.query.lon;
	if (!lat || !lon) {
		res.status(400).json('Bad request');
	}
	weather.getCurrentWeather(lat, lon)
		.then((currentWeather) => res.status(200).json({currentWeather}))
		.catch((error) => res.status(502).json(error));
});

module.exports = router;