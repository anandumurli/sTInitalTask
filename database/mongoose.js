const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://127.0.0.1:27017/actorManager', { useNewUrlParser: true,  useUnifiedTopology: true})
        .then(() =>{ console.log('database running') })
        .catch((err) => { console.log(err) });

module.exports = mongoose;