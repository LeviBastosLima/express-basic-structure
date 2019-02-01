const mongoose = require('mongoose')
const db = mongoose.connection

// Connection with User DB
mongoose.connect('mongodb://localhost/user', { useNewUrlParser: true, useFindAndModify: false });

//Error treatment with callback
db.on('error', (err) => {
    console.log(err)
});
db.once('open', function() {
    console.log('MongoDB Connection Succesful')
});

const userSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
        trim: true
    },
    surname: {
        type: String,
        required: true,
        trim: true
    },
})

const User = mongoose.model('User', userSchema)

module.exports = { User }