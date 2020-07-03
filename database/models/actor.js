const mongoose = require('mongoose');

const ActorSchema = new mongoose.Schema({
    actorName:{
        type: String,
        minlength: 2,
        required: true
    },
    movieName:{
        type: String,
        required: true
    },
    stDate:{
        type: String,
        required: true
    },
    ndDate:{
        type: String,
        required: true,
    },
    stMon:{
        type:String,
        required: true
    },
    ndMon:{
        type: String,
        required: true
    }
});

const Actor = mongoose.model('Actor', ActorSchema)
module.exports = Actor;