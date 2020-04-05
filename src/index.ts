import * as bodyParser from "body-parser";
import * as express from "express";
import { Request, Response } from "express";
import * as http from "http";
import * as fs from "fs"
const log4js = require('./utils/logger.ts');
const logger = log4js.getLogger('logger');

const app:express.Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':true}));
app.use(express.static('./public'));

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({status: "weather app"});
});

const loadModules = ()=>{
	try{
		fs.readFile('./modules.json','utf8', (error, data) => {
			let modules = JSON.parse(data);
			modules.forEach(function ({path, endPoint}) {
				try{
          if (path) {
            let reqModule = require(`./modules/${path}`); 
            app.use(endPoint, reqModule);
          }
				} catch(error) {
					logger.error(error, "Error cargando modulos" + path);
				}
			});
		});
	} catch(error) {
		logger.error(error);
	}
}
loadModules();

const httpPort:number = 8080;
app.set("port", httpPort);
const httpServer = http.createServer(app);

httpServer.listen(httpPort, (data) => {
  logger.trace(`Listening on port ${httpPort}`)
});