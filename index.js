
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

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

//final trial one
app.post('/selectedMovie', (req,res) =>{
    SelectMovies.findOne({actorName: req.body.name})
                .then((list) => {
                    if(list == null){
                        //save a new entry with the movie
                        (new SelectMovies({
                            'actorName': req.body.name,
                            'movies' :  [
                                {
                                    'mName': req.body.movies[0].mName,
                                    'stDate': req.body.movies[0].stDate,
                                    'ndDate': req.body.movies[0].ndDate,
                                    'stMon': req.body.movies[0].stMon,
                                    'ndMonth': req.body.movies[0].ndMonth,
                                }
                            ]                    
                        })).save()
                           .then((list) => {
                                res.send(list)
                           })
                           .catch((err) => {
                               console.log(err)
                           })
                    }else{
                        var dets = list.movies.length
                        if(list.movies[dets-1].stMon == req.body.movies[0].stMon){
                            if(list.movies[dets-1].ndMonth == req.body.movies[0].stMon){
                                if(list.movies[dets-1].ndDate < req.body.movies[0].stDate){
                                    list.movies[dets] = req.body.movies[0]
                                    SelectMovies.updateOne({_id: list._id},{
                                        movies: list.movies
                                    }).then((nli) =>{
                                        res.sendStatus(200)
                                    }).catch((err) =>{
                                        console.log(err)
                                    })
                                }
                                else{
                                    res.send('no data inserted first')
                                }
                            }
                            else{
                                res.send('no data inserted secon')
                            }
                        }else{
                            if(list.movies[dets-1].ndMonth != req.body.movies[0].stMon){
                                
                                list.movies[dets] = req.body.movies[0]
                                SelectMovies.updateOne({_id: list._id},{
                                    movies: list.movies
                                }).then((nli) =>{
                                    res.sendStatus(200)
                                }).catch((err) =>{
                                    console.log(err)
                                })
                            }else{
                                if(list.movies[dets-1].ndDate < req.body.movies[0].stDate ){
                                    list.movies[dets] = req.body.movies[0]
                                    SelectMovies.updateOne({_id: list._id},{
                                        movies: list.movies
                                    }).then((nli) =>{
                                        res.sendStatus(200)
                                    }).catch((err) =>{
                                        console.log(err)
                                    })
                                }
                                else{
                                    res.send('data not inserted last condition')
                                }
                            }
                        }
                    }
                }) 
                .catch((err) => {
                    console.log(err)
                })
})







app.get('/sm/:name', (req,res) =>{
    SelectMovies.findOne({actorName: req.params.name})
                .then((list) => {
                    if(list == null){
                        console.log('need this as new entry')
                    }
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
app.patch('/sm/:name', (req,res) => {
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