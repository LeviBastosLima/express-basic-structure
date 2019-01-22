const express = require('express')
const mongodb = require('mongodb')
const router = express.Router()
const model = require('./models')


router.get('/new-user', (req, res, next) => {
    res.render('accountsView/create-form')
})

router.post('/sucess-create', (req, res, next) =>{
    model.user.create(req.body, function(err){
        if (err) return handleError(err)
    })
    console.log(req.body)
    res.redirect('/accounts/list-user')
})

router.get('/list-user', (req, res, next) => {
    // console.log(mongodb.find({}, (err) => {
    //     if (err) return handleError(err)
    // }))
    res.render('accountsView/list')
})

module.exports = router