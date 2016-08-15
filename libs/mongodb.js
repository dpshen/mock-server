const mongoose = require('mongoose');

// mongoose.Promise = Promise;
const dbAddr = require('../config').dbAddr;

module.exports = mongoose.connect(dbAddr);
