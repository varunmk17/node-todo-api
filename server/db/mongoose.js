var mongoose = require('mongoose');
const mongodbUri = process.env.MONGODB_URI || 'mongodb://test:test@ds263988.mlab.com:63988/mynodetodo';

mongoose.Promise = global.Promise;
mongoose.connect(mongodbUri);

module.exports = {mongoose};