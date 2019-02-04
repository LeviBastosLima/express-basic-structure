const express = require('express')
const router = express.Router()
const Model = require('../models/userModel')


router.get('/create/:id', (req, res, next) =>{
    Model.users.findById( { _id: req.params.id } , (err, users) =>{
        if(err) return next(err)
        console.log()
        res.render('create-wallet', { user: users })
    })
})

router.post('/sucess-create/:id', (req, res, next) =>{
    Model.wallets.create(req.body, (err) => {
        if (err) return next(err)
        next()
    }), Model.users.findById({ _id: req.params.id }, (err, users) =>{
        res.redirect('/accounts/profile/' + users._id )
    })
})

module.exports = router