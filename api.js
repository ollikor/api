var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var objectId = require('mongodb').ObjectID;

app.use(cors());
app.use(bodyParser.json());

var url = 'mongodb://localhost:27017/';

var db;
  mongo.connect(url, function(err, database){
        if(err){
            throw err;
        }else{
            db = database
            console.log('connected');
        }
    });

app.get('/exercise', function(req, res){
    var dbo = db.db('health');
    dbo.collection('exercise').find({}).sort({date: -1}).toArray()
    .then((result) => {
        res.send(result);
    })
    .catch( (err) => {
        res.send(err);
    });
});

app.get('/', function(req, res){
    var dbo = db.db('health');
    var sortDate = {date: 1}
    dbo.collection('body').find().sort(sortDate).toArray()
    .then((result) => {
        res.send(result);
    })
    .catch( (err) => {
        res.send(err);
    });
});

app.get('/latestBodycomposition', function(req, res){
    var dbo = db.db('health');
    var sortDate = {date: -1}
    dbo.collection('body').find().sort(sortDate).limit(1).toArray()
    .then((result) => {
        res.send(result[0]);
    })
    .catch( (err) => {
        res.send(err);
    });
});

app.get('/recipes', function(req, res){
    var dbo = db.db('health');
    var sortDate = {date: -1}
    dbo.collection('recipes').find().sort(sortDate).toArray()
    .then((result) => {
        res.send(result);
    })
    .catch( (err) => {
        res.send(err);
    });
});

app.get('/recipe/:id', function(req, res){
    var dbo = db.db('health');
    dbo.collection('recipes').find({_id: objectId(req.params.id)}).toArray()
    .then((result) => {
        res.send(result[0]);
    })
    .catch( (err) => {
        res.send(err);
    });
});

app.get('/latestRecipe', function(req, res){
    var dbo = db.db('health');
    var sortDate = {date: -1}
    dbo.collection('recipes').find().sort(sortDate).limit(1).toArray()
    .then((result) => {
        res.send(result[0]);
    })
    .catch( (err) => {
        res.send(err);
    });
});

app.get('/channels', function(req, res){
    var dbo = db.db('health');
    var sortDate = {date: -1}
    dbo.collection('channels').find().sort(sortDate).toArray()
    .then((result) => {
        res.send(result);
    })
    .catch( (err) => {
        res.send(err);
    });
});

app.get('/channelOnHomepage', function(req, res){
    var dbo = db.db('health');
    var sortDate = {date: -1}
    dbo.collection('channelOnHomepage').find().sort(sortDate).toArray()
    .then((result) => {
        res.send(result[0]);
    })
    .catch( (err) => {
        res.send(err);
    });
});

app.post('/', function (req, res) {
    console.log(req.body);
    var dbo = db.db('health');
    var body = req.body;
    dbo.collection('body').insertOne(body)
    .then( (body) => {
        res.send(body);
    })
    .catch( (err) => {
        res.send(err);
    });
});

app.post('/exercise', function (req, res) {
    var dbo = db.db('health');
    var body = req.body;
    dbo.collection('exercise').insertOne(body)
    .then( (body) => {
        res.send(body);
    })
    .catch( (err) => {
        res.send(err);
    });
});

app.post('/recipes', function (req, res) {
    var dbo = db.db('health');
    var body = req.body;
    dbo.collection('recipes').insertOne(body)
    .then( (body) => {
        res.send(body);
    })
    .catch( (err) => {
        res.send(err);
    });
});

app.post('/channels', function (req, res) {
    var dbo = db.db('health');
    var body = req.body;
    dbo.collection('channels').insertOne(body)
    .then( (body) => {
        res.send(body);
    })
    .catch( (err) => {
        res.send(err);
    });
});

app.post('/channelOnHomepage', function (req, res) {
    var dbo = db.db('health');
    var body = req.body;
    dbo.collection('channelOnHomepage').insertOne(body)
    .then( (body) => {
        res.send(body);
    })
    .catch( (err) => {
        res.send(err);
    });
});

app.delete('/:date', function(req, res){
    var dbo = db.db('health');
    dbo.collection('body').deleteOne({date: `${req.params.date}`})
    .then((result) => {
        res.send(result);
    })
    .catch( (err) => {
        res.send(err);
    });
});

app.delete('/:id', function(req, res){
    var dbo = db.db('health');
    dbo.collection('body').deleteOne({_id: objectId(req.params.id)})
    .then((result) => {
        res.send(result);
    })
    .catch( (err) => {
        res.send(err);
    });
});

app.delete('/recipes/:id', function(req, res){
    var dbo = db.db('health');
    dbo.collection('recipes').deleteOne({_id: objectId(req.params.id)})
    .then((result) => {
        console.log(result);
        res.send(result);
    })
    .catch( (err) => {
        res.send(err);
    });
});

app.delete('/channels/:id', function(req, res){
    var dbo = db.db('health');
    dbo.collection('channels').deleteOne({_id: objectId(req.params.id)})
    .then((result) => {
        console.log(result);
        res.send(result);
    })
    .catch( (err) => {
        res.send(err);
    });
});

// app.post('/', function (req, res) {
//     var dbo = db.db('health');
//     var body = req.body;
//     dbo.collection('exercise').insertOne(body)
//     .then( (body) => {
//         res.send(body);
//     })
//     .catch( (err) => {
//         res.send(err);
//     });
// });

app.listen(8000);
console.log('running 8000');
