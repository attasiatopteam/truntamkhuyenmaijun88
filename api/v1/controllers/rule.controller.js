const rule = require('../models/rule.model')
module.exports = {
    getRule: async(req,res,next)=>{
        let getrule = await rule.findOne().exec()
        res.json(getrule)
    },
    createRule: async(req,res,next)=>{
        let {...body} = req.body
        let create = await rule.create(body)
        res.json(create)
    },
    editRule: async(req,res,next)=>{
        let {...body} = req.body
        let edit = await rule.findOneAndUpdate({promoName:body.promoName},body,{new: true})
        console.log(body)
        res.json(edit)
    },
    deleteRule: async(req,res,next)=>{
        let authorize = req.body.authorization
        let edit = await rule.findOneAndUpdate({_id:"637235910b6c419a8a480a01"},{authorization: authorize},{new: true})
        res.json(edit)
    }
}

//changed
//