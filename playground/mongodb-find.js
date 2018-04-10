const {MongoClient, ObjectID} = require('mongodb');
const mongodbUrl = 'mongodb://test:test@ds263988.mlab.com:63988/mynodetodo';

MongoClient.connect(mongodbUrl, (err, client) => {
    if(err) {
        return console.log(err);
    }
    console.log('DB Connection established.');
    const db = client.db('mynodetodo');

    // db.collection('Todos').find({_id: new ObjectID('5acc180570fb540e3cef5781')})
    //     .toArray().then((doc) => {
    //         console.log(JSON.stringify(doc, undefined, 2));  
    //     }).catch((err) => {
    //     console.log(err);
    // });

    // db.collection('Todos').find().count()
    //     .then((count) => {
    //         console.log(`Count: ${count}`);  
    //     }).catch((err) => {
    //     console.log(err);
    // });

    db.collection('Users').find({name: 'Arun'}).toArray()
        .then((doc) => {
            console.log(JSON.stringify(doc, undefined, 2));  
        }).catch((err) => {
        console.log(err);
    });
    client.close();
});