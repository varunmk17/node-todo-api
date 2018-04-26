var mongoose = require('mongoose');
const mongodbUri = process.env.MONGODB_URI;

mongoose.Promise = global.Promise;
mongoose.connect(mongodbUri);

module.exports = {mongoose};