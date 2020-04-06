import * as express from "express";
const log4js = require('../../utils/logger.ts');
const router = express.Router();
import {Cities} from './cities';
const cities = new Cities();

router.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
	cities.getAllCities(req.query.country)
		.then((allCities) => res.status(200).json({allCities}))
		.catch((error) => res.status(502).json(error));
});

router.get('/location', (req: express.Request, res: express.Response, next: express.NextFunction) => {
	cities.getCurrentLocation()
		.then((currentLocation) => res.status(200).json({currentLocation}))
		.catch((error) => res.status(502).json(error));
});

module.exports = router;