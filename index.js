var http = require('http');
var express = require('express');

const app = express();
app.use(express.json());

const mongoose  = require('./database/mongoose');    
const Actor = require('./database/models/actor');
const SelectMovies = require('./database/models/selectMovies');

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requestd-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use(express.static(__dirname + '/public'));









app.get('/sm/:id', (req,res) =>{
    SelectMovies.findById(req.params.id)
                .then((list) => {
                    res.send(list)
                })
                .catch((err) => {console.log(err)})
})

app.post('/selectMovie', (req,res) =>{
    (new SelectMovies({
        'actorName': req.body.aName,
        'movies' :  [
            {
                'movieName': req.body.mName,
                'stDate': req.body.sDate,
                'ndDate': req.body.nDate,
                'stMon': req.body.sMon,
                'ndMon': req.body.nMon
            }
        ]
    })).save()
       .then((list) => {res.send(list)})
       .catch((err) => {console.log(err)})
})

//use this logic to update the selectMovies
app.patch('/sm/:id', (req,res) => {
    SelectMovies.findById(req.params.id)
                .then((li) =>{
                    var dets = li.movies.length
                    li.movies[dets] = req.body
                    SelectMovies.updateOne({'_id':li._id},{
                        'movies': li.movies
                    }).then((nLi) => {
                        res.send(nLi)
                    }).catch((err) =>{
                        console.log(err)
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
})

//will not require this in the end
app.delete('/sm/:id', (req,res) =>{
  SelectMovies.findByIdAndDelete(req.params.id)
              .then((ls) => { res.send(ls) })
              .catch((err) => {console.log('err')})  
})

var server = http.createServer(app);
server.listen(3000);
console.log('node running at' + 3000);