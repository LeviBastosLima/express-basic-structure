const express = require('express')
const router = express.Router()
const Model = require('../models/models')
const errors = require('../config/errors')


router.get('/new-user', (req, res, next) => {
    res.render('create-form')
})

router.post('/success-create', (req, res, next) => {
    Model.Users.create(req.body, function (err) {
        if (!req.body.name || !req.body.surname) return next(errors.emptyFields)
        else if (err) return next(err)
        res.redirect('/accounts/list-user')
    })
})

router.get('/list-user', (req, res, next) => {
    Model.Users.find({}, (err, users) => {
        if (err) return next(err)
        res.render('list-user', { users: users })
    })
})

router.get('/update-user/:id', (req, res, next) => {
    Model.Users.findById(req.params.id, (err, users) => {
        if (err) return next(err)
        res.render('update-form', { user: users })
    })
})

router.post('/success-update/:id', (req, res, next) => {
    Model.Users.findByIdAndUpdate(req.params.id, req.body, { runValidators: true }, (err, user) => {
        if (!req.body.name || !req.body.surname) return next(errors.emptyFields)
        else if (err) return next(err)
        res.redirect('/accounts/list-user')
    })
})

router.get('/delete-user/:id', (req, res, next) => {
    Model.Users.deleteOne({ _id: req.params.id }, (err) => {
        if (err) return next(err)
        res.send(`O usuário de id: ${req.params.id} foi deletado! \n 
                <a href="/accounts/list-user">Voltar</a>`)

    })
})

router.get('/login', (req, res, next) => {
    res.render('login-form')
})

router.post('/success-login', (req, res, next) => {
    Model.Users.findOne({ name: req.body.name }, (err, user) => {
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
})

module.exports = router