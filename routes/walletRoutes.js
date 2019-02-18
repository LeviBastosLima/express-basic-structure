const express = require('express')
const router = express.Router()
const Model = require('../models/models')
const errors = require('../config/errors')

router.get('/profile', (req, res, next) => {
    if (!req.session.user_id) return res.redirect('/accounts/list-user')
    Model.Wallets.find({ user_id: req.session.user_id }, (err, wallets) => {
        if (err) return next(err)
        res.render('profile-user', { user: req.session.username, wallet: wallets })
    })
})

router.get('/create', (req, res, next) => {
    if (!req.session.user_id) return res.redirect('/accounts/list-user')
    res.render('create-wallet', { user: req.session.username })
})

router.post('/success-create', (req, res, next) => {
    Model.Wallets.create({ user_id: req.session.user_id, value: req.body.value }, (err) => {
        if (!req.session.user_id) res.redirect('/accounts/list-user')
        else if (!req.body.value) return next(errors.emptyFields)
        else if (err) return next(err)
        res.redirect('/accounts/profile/')
    })
})

router.get('/logout', (req, res, next) => {
    req.session.destroy()
    res.redirect('/accounts/list-user')
})

module.exports = router