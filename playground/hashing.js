const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123123';

bcrypt.genSalt(5, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash);
    });
});

var hashedPassword = '$2a$05$CAIodl66DJajjegdMyvC2.RL7DpEefjI3QBJzZl2FafgxNqeBC0za';

bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(res);
});

// var data = {
//     id: 4
// };

// var token = jwt.sign(data, '123abc');
// console.log(token);

// var decoded = jwt.verify(token, '123abc');
// console.log(decoded);
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