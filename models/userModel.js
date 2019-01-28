const mongoose = require('mongoose')
const db = mongoose.connection
const Scheme = mongoose.Schema


// Connection with User DB
mongoose.connect('mongodb://localhost/user', { useNewUrlParser: true});
//Error treatment with callback
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('sucessful connection')
});

const userScheme = new Scheme({
    name: String,
    surname: String
})

const User = mongoose.model('User', userScheme)

module.exports = { User }