const winston = require("winston");
const config = require("../config/config")

const loggingFormat = winston.format.printf(info => {
  return `${info.timestamp} ${info.level}: ${info.message}`;
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(winston.format.timestamp(), loggingFormat),
  transports: [
    new winston.transports.Console({ level: config.logging })
  ]
});

if (config.environment == "test") {
  module.exports = logger;
  return;
}

var filename;
var filename_error;
var filename_debug;
if (typeof process.env.LOGGER_PATH !== 'undefined') {
  filename = process.env.LOGGER_PATH + '/info.log';
  filename_error = process.env.LOGGER_PATH + '/error.log';
  filename_debug = process.env.LOGGER_PATH + '/debug.log';
} else {
  filename = './logs/info.log';
  filename_error = './logs/error.log';
  filename_debug = './logs/debug.log';

}

logger.add(new winston.transports.File({ filename: filename_debug, level: 'debug' }));
logger.add(new winston.transports.File({ filename: filename_error, level: 'error' }));
logger.add(new winston.transports.File({ filename: filename }));

module.exports = logger;