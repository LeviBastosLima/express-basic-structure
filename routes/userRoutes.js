const express = require('express')
const router = express.Router()
const Model = require('../models/userModel')

router.get('/new-user', (req, res, next) => {
    res.render('create-form')
})

router.post('/sucess-create', (req, res, next) => {
    Model.users.create(req.body, function (err) {
        if (err) return next(err)
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

router.post('/sucess-update/:id', (req, res, next) => {
    Model.users.findByIdAndUpdate(req.params.id, req.body, { runValidators: true }, (err, raw) => {
        if (err) return next(err)
        res.redirect('/accounts/list-user')
    })
})

router.get('/delete-user/:id', (req, res) => {
    Model.users.deleteOne({ _id: req.params.id }, (err) => {
        if (err) return next(err)
        res.send(`O usuário de id: ${req.params.id} foi deletado! \n 
                <a href="http://localhost:3000/accounts/list-user">Voltar</a>`)

    })
})

router.get('/profile/:id', (req, res, next) =>{
    Model.users.findById(req.params.id, (err, users) => {
        if (err) return next(err)
        res.render('profile-user', { user: users })
    })
})

router.get('/login', (req, res, next) => {
    res.render('login-form') 
})

router.post('/success-login', (req, res, next) => {
    //Programar autenticação
})


//Middleware para tratar erros
router.use((err, req, res, next) => {
    res.status(500).render('error', { erro: err._message, mensagem: err.message })
    //console.log(err)
})

module.exports = router

