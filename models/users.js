const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10

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

module.exports =  Users