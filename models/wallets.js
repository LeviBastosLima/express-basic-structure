const mongoose = require('mongoose')

const walletSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        min: 0,
        required: true
    }
})

const Wallets = mongoose.model('Wallet', walletSchema)

module.exports = Wallets