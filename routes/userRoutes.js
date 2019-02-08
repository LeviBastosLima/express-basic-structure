const express = require('express')
const router = express.Router()
const Model = require('../models/userModel')
const errors = require('../config/errors')


router.get('/new-user', (req, res, next) => {
    res.render('create-form')
})

router.post('/success-create', (req, res, next) => {
    Model.users.create(req.body, function (err) {
        if (!req.body.name || !req.body.surname) return next(errors.emptyFields)
        else if (err) return next(err)
        res.redirect('/accounts/list-user')
    })
})

router.get('/list-user', (req, res, next) => {
    Model.users.find({}, (err, users) => {
        if (err) return next(err)
        res.render('list-user', { users: users })
    })
})

router.get('/update-user/:id', (req, res, next) => {
    Model.users.findById(req.params.id, (err, users) => {
        if (err) return next(err)
        res.render('update-form', { user: users })
    })
})

router.post('/success-update/:id', (req, res, next) => {
    Model.users.findByIdAndUpdate(req.params.id, req.body, { runValidators: true }, (err, raw) => {
        if (!req.body.name || !req.body.surname) return next(errors.emptyFields)
        else if (err) return next(err)
        res.redirect('/accounts/list-user')
    })
})

router.get('/delete-user/:id', (req, res) => {
    Model.users.deleteOne({ _id: req.params.id }, (err) => {
        if (err) return next(err)
        res.send(`O usuário de id: ${req.params.id} foi deletado! \n 
                <a href="/accounts/list-user">Voltar</a>`)

    })
})

router.get('/profile/:id', (req, res, next) => {
    Model.users.findById(req.params.id, (err, users) => {
        if (err) return next(err)
        Model.wallets.find({ user_id: req.params.id }, (err, wallets) => {
            if (err) return next(err)
            res.render('profile-user', { user: users, wallet: wallets })
        })
    })
})

router.get('/login', (req, res, next) => {
    res.render('login-form')
})

router.post('/success-login', (req, res, next) => {
    Model.users.find(req.body, (err, users) => {
        if ((!req.body.name) || (!req.body.surname)) {
            return next(errors.emptyFields)
        } else if (!users.length) {
            return next(errors.invalidLogin)
        }
    })
})

module.exports = router

