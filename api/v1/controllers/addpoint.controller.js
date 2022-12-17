const axios = require('axios');
const autho = require('../middlewares/autholize.middleware')
const manualadjust = require('../middlewares/manualadjust.middleware')
module.exports = {
    addpoint: async(req,res,next)=>{
      let authorization = await autho()
      let {...body} = req.body
      var data = {
        "manualAdjustments": [
          {
            "playerid": body.user,
            "adjustamt": body.adjustment,
            "turnovervalue": body.turnover,
            "removegwc": false,
            "servicefee": "0",
            "adminfeeratio": "0",
            "turnovertype": "0",
            "ecremarks": body.ecremark,
            "remarks": body.remark,
            "reasontype": "2",
            "manualtype": "1",
            "walletid": "MAIN"
          }
        ],
        "sendmessage": true,
        "messages": {
          "msgtype": "2",
          "subject": body.subject,
          "content": body.content,
          "players": body.user
        }
      };

      var config = {
        method: 'post',
        url: 'https://boapi.jun88.bet/jun88-ims/api/v1/manualadjusts/batch',
        headers: { 
          'accept': ' */*', 
          'accept-encoding': ' gzip, deflate, br', 
          'accept-language': ' en-US,en;q=0.9,vi-VN;q=0.8,vi;q=0.7', 
          'authorization': authorization, 
          'content-type': ' application/json;charset=UTF-8', 
          'origin': ' https://bo.hi88admin.com', 
          'referer': ' https://bo.hi88admin.com/', 
          'Cookie': '__cf_bm=1REAnR9q_9O_s0HvLeJ7gRRTAToqn1ueZD5l_1zPmt8-1668430913-0-AagIqiOUtYC73w7IPs4t54T2J0k2ZVZET0SE2ZqdKJPO+v846U8G3K0VaG+H4WEQiN14XNGtnLyYP8J1bjM0yKE='
        },
        data : data
      };
      let checkResult = []
      await manualadjust(validateTimeStart,validateTimeEnd,promoInfo.remark,checkResult,result.data[0].playerid,authorization)
      console.log(checkResult[0])
      if(checkResult[0]==false){
        axios(config)
        .then(function (response) {
          res.json({
            code:200,
            mess:"success"
          })
        }).catch(function (error) {
          res.json({
            error
          })
        });
      }else{
        res.json({
          code:200,
          mess:"Quý khách đã nhận khuyến mãi."
        })
      }
    }
}