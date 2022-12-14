const express = require('express')
const {
    gethistory
} = require('../controllers/bettinghistory.controller')
const router = express.Router()

router.route('/')
.get(
    gethistory
)

module.exports = router