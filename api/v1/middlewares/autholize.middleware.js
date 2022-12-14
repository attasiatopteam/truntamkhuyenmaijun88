const authorization = require('../models/authorize.model')
module.exports = async(req,res,next)=>{
    let autho = await authorization.findOne().exec()
    return autho.authorization
}

//changed
//