var env = process.env.NODE_ENV || 'development';

if(env === 'development') {
    process.env.PORT = 1331;
    process.env.MONGODB_URI = 'mongodb://test:test@ds263988.mlab.com:63988/mynodetodo'
} else if (env === 'test') {
    process.env.PORT = 1331;
    process.env.MONGODB_URI = 'mongodb://test:test@ds263988.mlab.com:63988/mynodetodotest'
}

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const {ObjectId} = require('mongodb');
const PORT = process.env.PORT;

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo ({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.status(200).send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

// GET /todos/123123
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if(!ObjectId.isValid(id)) {
        return res.status(404).send('Invalid Id');
    }

    var todo = Todo.findById(id).then((todo) => {
                    if(!todo) {
                        return res.status(404).send('Todo not found');
                    }
                    res.status(200).send(todo);
                }, (e) => res.status(404).send('Oops.!!'))
});

// DELETE /todos/123123
app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    if(!ObjectId.isValid(id)) {
        return res.status(404).send('Invalid Id');
    }    

    Todo.findByIdAndRemove(id)
        .then((doc) => {
            if(!doc) {
                return res.status(404).send('Doc not found');
            }
            res.status(200).send({doc});
        }, (e) => res.status(404).send('Oops..'));
});

// UPDATE /todos/123123
app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectId.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true})
        .then((todo) => {
            if(!todo) {
                return res.status(404).send();
            }
            res.send({todo});
        })
        .catch((e) => res.status(404).send());
});

// POST /users
app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((err) => res.status(400).send(err));
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});


// POST / users/login {email, password}
app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((err) => {
        res.status(400).send();
    });
});

app.listen(PORT, () => {
    console.log(`Server running in ${PORT}`)
});

module.exports = {app};