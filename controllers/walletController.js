const Wallets = require('../models/wallets')
const errors = require('../config/errors')

exports.profile = (req, res, next) => {
    if (!req.session.user_id) return res.redirect('/accounts/list-user')
    Wallets.find({ user_id: req.session.user_id }, (err, wallets) => {
        if (err) return next(err)
        res.render('profile-user', { user: req.session.username, wallet: wallets })
    })
}

exports.newWallet = (req, res, next) => {
    if (!req.session.user_id) return res.redirect('/accounts/list-user')
    res.render('create-wallet', { user: req.session.username })
}

exports.walletCreated = (req, res, next) => {
    Wallets.create({ user_id: req.session.user_id, value: req.body.value }, (err) => {
        if (!req.session.user_id) res.redirect('/accounts/list-user')
        else if (!req.body.value) return next(errors.emptyFields)
        else if (err) return next(err)
        res.redirect('/accounts/profile/')
    })
}

exports.logout = (req, res, next) => {
    req.session.destroy()
    res.redirect('/accounts/list-user')
}