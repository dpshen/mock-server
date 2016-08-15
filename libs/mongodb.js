const mongoose = require('mongoose');

// mongoose.Promise = Promise;
const dbAddr = require('../config').dbAddr;

mongoose.connect(dbAddr);

module.exports = mongoose;
