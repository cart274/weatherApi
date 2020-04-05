import * as express from "express";
const router = express.Router();
const log4js = require('../../utils/logger.ts');
const logger = log4js.getLogger('logger');

router.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
	logger.trace('./weather');
	res.status(200).json({status: "weather"});
});

module.exports = router;