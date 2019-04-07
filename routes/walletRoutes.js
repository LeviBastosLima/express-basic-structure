const express = require('express')
const router = express.Router()
const Model = require('../models/wallets')
const errors = require('../config/errors')
const walletController = require('../controllers/walletController')


router.get('/profile', walletController.profile)

router.get('/create', walletController.newWallet)

router.post('/success-create', walletController.walletCreated)

router.get('/logout', walletController.logout)

module.exports = router