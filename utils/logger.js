const winston = require('winston');
const path = require('path');

// Define log levels and colors
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

winston.addColors(colors);

// Create format for logging
const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
);

// Define transport configuration based on environment
const transports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: path.join(__dirname, '../logs/error.log'),
    level: 'error',
  }),
  new winston.transports.File({ 
    filename: path.join(__dirname, '../logs/all.log') 
  }),
];

// Create and configure logger
const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'http' : 'debug',
  levels,
  format,
  transports,
});

// Export a wrapper for common logging scenarios
module.exports = {
  error: (message, meta = {}) => {
    logger.error(message, { meta });
  },
  warn: (message, meta = {}) => {
    logger.warn(message, { meta });
  },
  info: (message, meta = {}) => {
    logger.info(message, { meta });
  },
  http: (message, meta = {}) => {
    logger.http(message, { meta });
  },
  debug: (message, meta = {}) => {
    logger.debug(message, { meta });
  }
};
