const express = require('express')
const {
    getAuth,
    createAuth,
    editAuth
} = require('../controllers/authorization.controller')
const router = express.Router()

router.route('/')
.get(
    getAuth
)
.post(
    createAuth
)
.patch(
    editAuth
)

module.exports = router