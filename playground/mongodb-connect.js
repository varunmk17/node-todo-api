//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');
const mongodbUrl = 'mongodb://test:test@ds263988.mlab.com:63988/mynodetodo';

MongoClient.connect(mongodbUrl, (err, client) => {
    if(err) {
        return console.log(err);
    }
    console.log('DB Connection established.');
    const db = client.db('mynodetodo');

    // db.collection('Todos').insertOne({
    //     text: 'todo 2',
    //     completed: false
    // }, (err, result) => {
    //     if(err) {
    //         return console.log('Insert failed..')
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // db.collection('Users').insertOne({
    //     name: 'Arun',
    //     age: 31,
    //     location: 'OH'
    // }, (err, result) => {
    //     if(err) {
    //         return console.log('Insert failed..')
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    client.close();
});