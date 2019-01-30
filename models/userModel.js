const mongoose = require('mongoose')
const db = mongoose.connection

// Connection with User DB
mongoose.connect('mongodb://localhost/user', { useNewUrlParser: true});

//Error treatment with callback
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
    console.log('Connection Succesful')
});

const userSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
})

const User = mongoose.model('User', userSchema)

module.exports = { User }