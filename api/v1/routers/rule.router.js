const express = require('express')
const {
    getRule,
    createRule,
    editRule,
    deleteRule
} = require('../controllers/rule.controller')
const router = express.Router()

router.route('/')
.get(
    getRule
)
.post(
    createRule
)
.patch(
    editRule
)
.delete(
    deleteRule
)

module.exports = router