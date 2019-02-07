const express = require('express')
const router = express.Router()
const Model = require('../models/userModel')


router.get('/create/:id', (req, res, next) =>{
    Model.users.findById( { _id: req.params.id } , (err, users) =>{
        if(err) return next(err)
        res.render('create-wallet', { user: users })
    })
})

router.post('/sucess-create/:id', (req, res, next) =>{
    Model.wallets.create({ user_id: req.params.id, value: req.body.value } , (err) => {
        if (err) return next(err)
        res.redirect('/accounts/profile/' + req.params.id )
    })
})

//Middleware para tratar erros
router.use((err, req, res, next) => {
    if (!req.body.value) {
        return res.status(500).render('error', { erro: 'Campo Vazio', mensagem: 'O campo "valor" não foi preenchido.' })
    } else {
        res.status(500).render('error', { erro: err._message, mensagem: err.message })
    }
})

module.exports = router