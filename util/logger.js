const winston = require('winston');

// debug info warn error fatal
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports:[
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/app.log' }),
    ]
});

module.exports = logger;