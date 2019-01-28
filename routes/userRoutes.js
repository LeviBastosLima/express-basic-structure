const express = require('express')
const router = express.Router()
const model = require('../models/userModel')


router.get('/new-user', (req, res, next) => {
    res.render('create-form')
})

router.post('/sucess-create', (req, res, next) =>{
    model.User.create(req.body, function(err){
        if (err) return handleError(err)
    })
    console.log(req.body)
    res.redirect('/accounts/list-user')
})

router.get('/list-user', (req, res, next) => {
    model.User.find({}, (err, users) => {
        if (err) 
            return handleError(err);

        res.send(users);
    })
})

module.exports = router

