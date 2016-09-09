const log4js = require('log4js');
const log4jsconf = require('../server-config').log4jsconf;

log4js.configure(log4jsconf);
var logger = log4js.getLogger('mock');
var errLogger = log4js.getLogger('mock-ERR');

var _error = logger.error;
logger.error = function () {
    _error.apply(logger, arguments);
    errLogger.error.apply(errLogger, arguments);
};

module.exports = logger;