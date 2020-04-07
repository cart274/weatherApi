import * as fs from "fs"
const log4js = require('./logger.ts');
const logger = log4js.getLogger('logger');
import * as express from "express";

const loadModules = (app:express.Application)=>{
	try{
		fs.readFile('./modules.json','utf8', (error, data) => {
			let modules = JSON.parse(data);
			modules.forEach(function ({path, endPoint}) {
				try{
                    if (path) {
                        let reqModule = require(`../modules/${path}`); 
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

module.exports = loadModules;