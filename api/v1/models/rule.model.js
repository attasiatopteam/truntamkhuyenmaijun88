const mongoose = require('mongoose')

const rule = mongoose.Schema({
    url: String,
    promoName: {
        type:String,
        unique:true
    },
    startTime: String,
    endTime: String,
    validateTimeStart: String,
    validateTimeEnd: String,
    producttype: String,
    remark: String,
    limit: String,
    method:String,

    condition:String,
    conditionValue: Array,
    calculateMethod: String,
    calculateValue: String,
    avoidMethod:String,
    avoidValue:Array,
    date:Array,
    bonus:Array,
    turnovervalue:Number,

    promotionTile:String,
    subject:String,
    content:String,
})

module.exports = mongoose.model('rule',rule)





