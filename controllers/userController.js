const Users = require('../models/users')
const errors = require('../config/errors')

exports.newUser = (req, res, next) => {
    res.render('create-form')
}

exports.userCreated = (req, res, next) => {
    Users.create(req.body, function (err) {
        if (!req.body.name || !req.body.surname) return next(errors.emptyFields)
        else if (err) return next(err)
        res.redirect('/accounts/list-user')
    })
}

exports.listUsers = (req, res, next) => {
    Users.find({}, (err, users) => {
        if (err) return next(err)
        res.render('list-user', { users: users })
    })
}

exports.updateUser = (req, res, next) => {
    Users.findById(req.params.id, (err, users) => {
        if (err) return next(err)
        res.render('update-form', { user: users })
    })
}

exports.userUpdated = (req, res, next) => {
    Users.findByIdAndUpdate(req.params.id, req.body, { runValidators: true }, (err, user) => {
        if (!req.body.name || !req.body.surname) return next(errors.emptyFields)
        else if (err) return next(err)
        res.redirect('/accounts/list-user')
    })
}

exports.deleteUser = (req, res, next) => {
    Users.deleteOne({ _id: req.params.id }, (err) => {
        if (err) return next(err)
        res.send(`O usuário de id: ${req.params.id} foi deletado! \n 
                <a href="/accounts/list-user">Voltar</a>`)

    })
}

exports.loginUser = (req, res, next) => {
    res.render('login-form')
}

exports.userAuth = (req, res, next) => {
    Users.findOne({ name: req.body.name }, (err, user) => {
        if (err) return next(err)
        if ((!req.body.name) || (!req.body.password)) {
            return next(errors.emptyFields)
        } else if (!user) {
            return next(errors.invalidLogin)
        }
        user.comparePassword(req.body.password, function (err, isMatch) {
            if (err) return next(err)
            else if (!isMatch) {
                return next(errors.invalidLogin)
            } else if (isMatch) {
                req.session.user_id = user._id
                req.session.username = user.name
                res.redirect('/wallets/profile')
            }
        })
    })
}