const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/new-user', userController.newUser)
router.post('/success-create', userController.userCreated)

router.get('/list-user', userController.listUsers)

router.get('/update-user/:id', userController.updateUser)
router.post('/success-update/:id', userController.userUpdated)

router.get('/delete-user/:id', userController.deleteUser)

router.get('/login', userController.loginUser)
router.post('/success-login', userController.userAuth)

module.exports = router