const mongoose = require('mongoose');

const SelectMovieSchema = new mongoose.Schema({
    actorName:{
        type: String,
        required: true,
    },
    movies: mongoose.Schema.Types.Mixed
});

const SelectMovies = mongoose.model('SelectMovies', SelectMovieSchema)
module.exports = SelectMovies;