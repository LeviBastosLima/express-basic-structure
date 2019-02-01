const express = require('express')
const router = express.Router()
const model = require('../models/userModel')

router.get('/new-user', (req, res, next) => {
    res.render('create-form')
})

router.post('/sucess-create', (req, res, next) =>{
    model.User.create(req.body, function(err){
        if (err) return next(err)
        res.redirect('/accounts/list-user')
    })
})

router.get('/list-user', (req, res, next) => {
    model.User.find({}, (err, users) => {
        if (err) return res.send(err);
        res.render('listUser', { users: users })
    })
})

router.get('/update-user/:id', (req, res, next) => {
    model.User.findById(req.params.id, (err, users) =>{
        if(err) return res.send(err)
        res.render('update-form', { user: users })
    })
})

router.post('/sucess-update/:id', (req, res, next) => {
    model.User.findByIdAndUpdate( req.params.id, req.body, (err, raw) => {
        if(err) return res.send(err)
        res.redirect('/accounts/list-user')
    })
})

router.get('/delete-user/:id', (req, res) => {
    model.User.remove({ _id: req.params.id }, (err) => {
        if(err){
            return res.send(err)
        }else{
            res.send(`O usuário de id: ${req.params.id} foi deletado! \n 
                <a href="http://localhost:3000/accounts/list-user">Voltar</a>`)
        }
    })
})

router.use((err, req, res, next) => {
    res.status(500).render('error500', { erro : err._message, mensagem : err.message })
    //console.log(err)
})

module.exports = router

