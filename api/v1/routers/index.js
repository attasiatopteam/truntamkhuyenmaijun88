const addpoint = require('./addpoint.router')
const authorization = require('./authorization.router')
const bettinghistory = require('./bettinghistory.router')
const rule = require('./rule.router')
const test = require('../middlewares/validplayer.middleware')
const getTimeZone = require('./getTimeZone')

const router = (app)=>{
    app.use('/addpoint', addpoint)
    app.use('/autho', authorization)
    app.use('/bettinghistory', bettinghistory)
    app.use('/rule', rule)
    app.use('/test',test)
    app.use('/tz',getTimeZone)
}

module.exports = router
