import * as express from "express";
import * as fs from "fs"
const log4js = require('../../utils/logger.ts');
const logger = log4js.getLogger('logger');

const router = express.Router();

router.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
	try{
		fs.readFile('./public/city.list.json','utf8', (error, data) => {
			res.status(200).json(JSON.parse(data));
		});
	}
	catch(error){
		logger.error(error);
	}
});

module.exports = router;