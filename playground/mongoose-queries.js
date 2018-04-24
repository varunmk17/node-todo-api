const {ObjectId} = require('mongodb');
const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

var UserId = '5acd71d70985254918f6d214';

// var id = '5ade7f2527f6090b84ed1fe61';

// if (!ObjectId.isValid(id)) {
//     return console.log('Id not valid');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos:', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo:', todo);
// });

// Todo.findById(id).then((todo) => {
//     if(!todo) {
//         return console.log('Todo By Id: Id not found');
//     }
//     console.log('Todo By Id:', todo);
// }).catch((e) => console.log(e));


User.findById(UserId).then((user) => {
    if(!user) {
        return console.log('User not found.');
    }
    console.log('User By Id:', user);
}).catch((e) => console.log(e));