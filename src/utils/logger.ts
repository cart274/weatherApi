const log4js = require('log4js');
log4js.configure({
    appenders: {
        errorFile: {
            type: "file",
            filename: "./logs/logs.log",
            backups: 3
        },
        logger: { type: 'stdout' }
    },
    categories: {
        default: { appenders: ["logger", "errorFile"], level: "trace" }
    }
});
module.exports = log4js;