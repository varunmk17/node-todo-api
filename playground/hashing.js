const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
    id: 4
};

var token = jwt.sign(data, '123abc');
console.log(token);

var decoded = jwt.verify(token, '123abc');
console.log(decoded);
// var message = 'hello world!';
// var hash  = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
//     id: 4
// };

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'secret').toString()
// };

// var resultHash = SHA256(JSON.stringify(token.data) + 'secret').toString();

// if(resultHash === token.hash) {
//     console.log('Authentication Success')
// } else {
//     console.log('Authentication Failed')
// }