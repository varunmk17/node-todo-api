var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
const {ObjectId} = require('mongodb');

const PORT = process.env.PORT || 1331;

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
        return res.status(400).send('Invalid Id');
    }

    var todo = Todo.findById(id)
                .then((todo) => {
                    if(!todo) {
                        return res.status(404).send('Todo not found');
                    }
                    res.status(200).send(todo);
                }, (e) => res.status(404).send('Oops.!!'))
});

app.listen(PORT, () => {
    console.log(`Server running in ${PORT}`)
});

module.exports = {app};