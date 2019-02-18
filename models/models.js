const mongoose = require('mongoose')
const db = mongoose.connection
const bcrypt = require('bcrypt')
const saltRounds = 10

// Connection with User DB
mongoose.connect('mongodb://localhost/user', { useNewUrlParser: true, useFindAndModify: false });

//Error treatment with callback
db.on('error', (err) => {
    console.log(err)
});
db.once('open', function () {
    console.log('MongoDB Connection Succesful')
});

const walletSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        min: 0,
        required: true
    }
})

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
    password: {
        type: String,
        required: true,
        trim: true
    },
})

// Encriptando senha com Bcrypt antes de salvar no DB

userSchema.pre('save', function(next) {
    let user = this

    if(!user.isModified('password')) return next()

    bcrypt.genSalt(saltRounds, function(err, salt) {
        if (err) return next(err)

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err)

            user.password = hash
            next()
        })
    })
})

userSchema.methods.comparePassword = function(submittedPassword, callback) {
    bcrypt.compare(submittedPassword, this.password, function(err, isMatch) {
        if (err) return callback(err)
        callback(null, isMatch)
    })
} 

const Users = mongoose.model('User', userSchema)
const Wallets = mongoose.model('Wallet', walletSchema)

module.exports = { Users, Wallets }