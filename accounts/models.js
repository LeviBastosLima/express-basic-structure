const mongoose = require('mongoose')
const mongodb = require('mongodb')
const db = mongoose.connection
const Scheme = mongoose.Schema

mongoose.connect('mongodb://localhost/user', { useNewUrlParser: true});

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('COnectou ao MOngo')
});

const userScheme = new Scheme({
    name: String,
    surname: String
})

user = mongoose.model('User', userScheme)

module.exports = { mongoose, user }