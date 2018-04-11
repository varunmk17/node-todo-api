var mongoose = require('mongoose');
const mongodbUrl = 'mongodb://test:test@ds263988.mlab.com:63988/mynodetodo';

mongoose.Promise = global.Promise;
mongoose.connect(mongodbUrl);

module.exports = {mongoose};