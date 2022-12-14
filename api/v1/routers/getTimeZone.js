const express = require('express')
const router = express.Router()

router.route('/')
.get((req,res,next)=>{
    res.json({
        code:200,
        timezone: new Date().getTime()
    })
})

module.exports = router