const mongoose = require('mongoose')

const authorize = mongoose.Schema({
    authorization: String
})

module.exports = mongoose.model('authorization',authorize)