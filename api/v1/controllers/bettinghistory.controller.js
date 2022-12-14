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
      let producttype = promoInfo.producttype
      let condition = promoInfo.condition
      console.log(date.date)
      var config = {
        method: 'get',
        url: 'https://boapi.jun88.bet/jun88-ims/api/v1/reports/betting?'
        +'&starttime='+startTime
        +'&endtime='+endTime
        +promoInfo.url
        +'&producttype='+producttype
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
        let buyticket = await buyticketcheck(producttype,result.data[0].roundid,startTime,endTime,promoInfo.url,result.data[0].betamount,authorization)
        console.log("Is this ticket a bought ticket? "+buyticket)
        if(buyticket==true && req.query.promoid=="DZ06"){
          failure(res,200,"??? ????? tham gia khuy???n m??i y??u c???u t???i thi???u ?????t c?????c 1 ??i???m, c??c v?? c?????c tr??n b??i ??i???n t??? hai m???t, v?? c?????c mi???n ph?? ?????t c?????c jackpot, c??c v?? c?????c h???y b???, v?? g???p , v?? hi???u ?????u kh??ng ???????c tham gia khuy???n m??i n??y.")
        }else{
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
                            success(res,result,score,promoInfo,calculateValue,startTime,endTime,validateTimeStart,validateTimeEnd)
                          }
                        }else{
                          failure(res,200,"Qu?? kh??ch ch??a ????? ??i???u ki???n nh???n khuy??n m??i")
                        }
                      }else{
                        failure(res,200,'Qu?? kh??ch ch??a ????? ??i???u ki???n nh???n khuy??n m??i')
                      }
                    }else{
                      failure(res,200,'Qu?? kh??ch ch??a ????? ??i???u ki???n nh???n khuy??n m??i')
                    }
                  }else{
                    failure(res,200,'Qu?? kh??ch ch??a ????? ??i???u ki???n nh???n khuy??n m??i')
                  }
                }else{
                  failure(res,200,'Qu?? kh??ch ch??a ????? ??i???u ki???n nh???n khuy??n m??i')
                }
              }else{
                failure(res,200,"Qu?? kh??ch ch??a ????? ??i???u ki???n nh???n khuy??n m??i")
              }
            }else{
              failure(res,200,"Qu?? kh??ch ???? nh???n khuy???n m??i n??y")
            }
          }else{
            failure(res,200,"Qu?? kh??ch ch??a ????? ??i???u ki???n nh???n khuy??n m??i")
          }
        }
      }).catch(function (error) {
        res.json({
          promoName: promoInfo.promoName,
          promotionTile: promoInfo.promotionTile,
          playerid: "Qu?? kh??ch ch??a ????? ??i???u ki???n nh???n khuy???n m??i.",
          score: 0,
          bonus: 0,
          turnover:0,
          subject: "B???n ch??a ????? ??i???u ki???n ????? nh???n khuy???n m??i t???i Jun88",
          content: "B???n ch??a ????? ??i???u ki???n ????? nh???n khuy???n m??i t???i Jun88",
          startTime:startTime,
          endTime:endTime
        });
      });
    }  
}

function success(res,result,score,promoInfo,calculateValue,startTime,endTime,validateTimeStart,validateTimeEnd){
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
    endTime:endTime,
    validateTimeStart:validateTimeStart,
    validateTimeEnd:validateTimeEnd
  })
}

function failure(res,code,reason){    
  res.json({
    code:code,
    mess:reason
  })
}

//12
