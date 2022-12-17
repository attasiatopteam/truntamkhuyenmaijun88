const axios = require('axios');
const autho = require('../middlewares/autholize.middleware')
const date = require('../const/date')
const getPromo = require('../middlewares/getPromo.middleware')
const asyncHandller = require('../middlewares/async.middleware')
const manualadjust = require('../middlewares/manualadjust.middleware')
const validplayer = require('../middlewares/validplayer.middleware')
const buyticketcheck = require('../middlewares/buyticketcheck.middleware')
const promotionModel = require('../models/promotion.model')
module.exports = {
    gethistory: async(req,res,next)=>{
      finalize = []
      let authorization = await autho()
      let promoInfo = await getPromo(req.query.promoid)
      let startTime = date[promoInfo.startTime]
      let endTime = date[promoInfo.endTime]
      let validateTimeStart = date[promoInfo.validateTimeStart]
      let validateTimeEnd = date[promoInfo.validateTimeEnd]
      let producttype = []
      if(promoInfo.producttype!="none"){
        producttype[0]=promoInfo.producttype
      }else{
        producttype[0]=""
      }
      let condition = promoInfo.condition
      console.log(date.date)
      var config = {
        method: 'get',
        url: 'https://boapi.jun88.bet/jun88-ims/api/v1/reports/betting?'
        +'&starttime='+startTime
        +'&endtime='+endTime
        +promoInfo.url
        +producttype[0]
        +"&zoneType=ASIA_SHANGHAI"
        +promoInfo.method+req.query.id,
        headers: { 
          'accept': ' */*', 
          'accept-encoding': ' gzip, deflate, br', 
          'accept-language': ' en-US,en;q=0.9,vi-VN;q=0.8,vi;q=0.7', 
          'authorization': authorization, 
          'origin': ' https://boapi.jun88.bet',  
          'referer': ' https://boapi.jun88.bet/', 
        }
      };
      axios(config)
      .then( async(response)=> {
        console.log(config.url)
        let result = response.data
        let buyticket = await buyticketcheck(producttype,result.data[0].roundid,startTime,endTime,promoInfo.url,authorization)
        console.log("Is this ticket a bought ticket? "+buyticket)
        if(buyticket==false){
          let calculateValue = eval(promoInfo.calculateValue)
          console.log(calculateValue)
          let checkResult = []
          await manualadjust(validateTimeStart,validateTimeEnd,promoInfo.remark,checkResult,result.data[0].playerid,authorization)
          console.log(checkResult[0])
          let valideplayerCheck = await validplayer(result.data[0].playerid,authorization)
          console.log(valideplayerCheck)
          if(valideplayerCheck=="valid"){
            if(checkResult[0]==false){
              if(calculateValue!=null){
                let avoidMethod = eval(promoInfo.avoidMethod)
                console.log(avoidMethod)
                console.log(promoInfo.avoidValue)
                if(promoInfo.avoidValue.indexOf(avoidMethod)==-1){
                  console.log(eval(promoInfo.avoidMethod))
                  let validDate = promoInfo.date.indexOf(date.date)!=-1
                  if(validDate==true){
                    if(checkResult[0]==false){
                      let conditionValue = promoInfo.conditionValue
                      eval(promoInfo.condition)
                      console.log(finalize[0])
                      var condifunction = conditionValue.indexOf(finalize[0])
                      console.log(condifunction)
                      if(condifunction!=-1){
                        let bonus = promoInfo.bonus[condifunction]
                        let calculateMethod = eval(promoInfo.calculateMethod)
                        let score = Math.round(calculateMethod * 100) / 100
                        console.log(score)
                        console.log("this is the score: "+score)
                        let limit
                        eval(promoInfo.limit)
                        let limitResult = limit(result)
                        console.log(limitResult)
                        console.log("limit: "+limitResult)
                        if(score!=''){
                          if(score<=limitResult-1){
                            console.log("final score: "+score)
                            success(res,result,score,promoInfo,calculateValue,startTime,endTime)
                          }else{
                            score = limitResult
                            console.log("final score: "+score)
                            success(res,result,score,promoInfo,calculateValue,startTime,endTime)
                          }
                        }else{
                          failure(res,200,"Quý khách chưa đủ điều kiện nhận khuyên mãi")
                        }
                      }else{
                        failure(res,200,'Quý khách chưa đủ điều kiện nhận khuyên mãi')
                      }
                    }else{
                      failure(res,200,'Quý khách chưa đủ điều kiện nhận khuyên mãi')
                    }
                  }else{
                    failure(res,200,'Quý khách chưa đủ điều kiện nhận khuyên mãi')
                  }
                }else{
                  failure(res,200,'Quý khách chưa đủ điều kiện nhận khuyên mãi')
                }
              }else{
                failure(res,200,"Quý khách chưa đủ điều kiện nhận khuyên mãi")
              }
            }else{
              failure(res,200,"Quý khách đã nhận khuyến mãi này")
            }
          }else{
            failure(res,200,"Quý khách chưa đủ điều kiện nhận khuyên mãi")
          }
        }else{
          failure(res,200,"Quý khách chưa đủ điều kiện nhận khuyên mãi")
        }
      }).catch(function (error) {
        res.json({
          promoName: promoInfo.promoName,
          promotionTile: promoInfo.promotionTile,
          playerid: "Quý khách chưa đủ điều kiện nhận khuyến mãi.",
          score: 0,
          bonus: 0,
          turnover:0,
          subject: "Bạn chưa đủ điều kiện để nhận khuyến mãi tại Jun88",
          content: "Bạn chưa đủ điều kiện để nhận khuyến mãi tại Jun88",
          startTime:startTime,
          endTime:endTime
        });
      });
    }  
}

function success(res,result,score,promoInfo,calculateValue,startTime,endTime){
  res.json({
    promoName: promoInfo.promoName,
    promotionTile: promoInfo.promotionTile,
    playerid: result.data[0].playerid,
    score: calculateValue,
    bonus: score,
    turnover:promoInfo.turnovervalue,
    subject: promoInfo.subject,
    content: promoInfo.content,
    startTime:startTime,
    endTime:endTime
  })
}

function failure(res,code,reason){    
  res.json({
    code:code,
    mess:reason
  })
}

//12
