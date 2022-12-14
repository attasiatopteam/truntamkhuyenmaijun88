const promotionRule = require('../models/rule.model')
module.exports = async(promoid)=>{
    let rule = await promotionRule.findOne({promoName: promoid}).exec()
    return rule
}

//changed
