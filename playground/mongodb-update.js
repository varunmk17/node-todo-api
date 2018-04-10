const {MongoClient, ObjectID} = require('mongodb');
const mongodbUrl = 'mongodb://test:test@ds263988.mlab.com:63988/mynodetodo';

MongoClient.connect(mongodbUrl, (err, client) => {
    if(err) {
        return console.log(err);
    }
    console.log('DB Connection established.');
    const db = client.db('mynodetodo');

    // db.collection('Todos').findOneAndUpdate({_id: new ObjectID('5acc1adcf55b6843c08e20f7')}, {
    //         $set: {
    //             completed: true
    //         }
    //     }, {
    //         returnOriginal: false
    //     }
    // ).then((res) => {
    //     console.log(res);
    // });

    db.collection('Users').findOneAndUpdate({_id: new ObjectID('5acc1b720e1082133cece2f0')}, {
        $set: {
            name: 'Varun K'
        }, $inc: {
            age: -1
        }
        }, {
            returnOriginal: false
        }
        ).then((res) => {
            console.log(res);
        });

    client.close();
});