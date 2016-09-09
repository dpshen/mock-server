const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const dbAddr = require('../server-config').dbAddr;

mongoose.connect(dbAddr);

module.exports = mongoose;
