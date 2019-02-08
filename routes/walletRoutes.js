const express = require('express')
const router = express.Router()
const Model = require('../models/userModel')
const errors = require('../config/errors')


router.get('/create/:id', (req, res, next) =>{
    Model.users.findById( { _id: req.params.id } , (err, users) =>{
        if(err) return next(err)
        res.render('create-wallet', { user: users })
    })
})

router.post('/success-create/:id', (req, res, next) =>{
    Model.wallets.create({ user_id: req.params.id, value: req.body.value } , (err) => {
        if (!req.body.name || !req.body.surname) return next(errors.emptyFields)
        else if (err) return next(err)
        res.redirect('/accounts/profile/' + req.params.id )
    })
})

module.exports = router