const {MongoClient, ObjectID} = require('mongodb');
const mongodbUrl = 'mongodb://test:test@ds263988.mlab.com:63988/mynodetodo';

MongoClient.connect(mongodbUrl, (err, client) => {
    if(err) {
        return console.log(err);
    }
    console.log('DB Connection established.');
    const db = client.db('mynodetodo');

    // db.collection('Todos').findOneAndDelete({completed: true})
    //     .then((res) => {
    //         console.log(res);
    //     }).catch((err) => {
    //         console.log(err);
    //     });

    db.collection('Users').findOneAndDelete({_id: new ObjectID('5acc1bfa5e35622bdcc424a6')})
    .then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    });

    client.close();
});