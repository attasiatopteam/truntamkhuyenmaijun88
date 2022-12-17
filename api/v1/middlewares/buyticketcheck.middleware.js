const axios = require('axios');
module.exports = (producttype,roundid,startTime,endTime,url,authorization)=>{
  if(producttype=="EGAME"){
    var config = {
      method: 'get',
      url: 'https://boapi.jun88.bet/jun88-ims/api/v1/reports/betting?'
      +'&starttime='+startTime
      +'&endtime='+endTime
      +url
      +'&producttype='+producttype
      +"&zoneType=ASIA_SHANGHAI"
      +"&roundid="+roundid,
      headers: { 
        'accept': ' */*', 
        'accept-encoding': ' gzip, deflate, br', 
        'accept-language': ' en-US,en;q=0.9,vi-VN;q=0.8,vi;q=0.7', 
        'authorization': authorization, 
        'origin': ' https://boapi.jun88.bet',  
        'referer': ' https://boapi.jun88.bet/', 
      }
    };
    return axios(config)
    .then( async(response)=> {
      console.log(response.data.total)
      if(response.data.total>1){
        return true
      }else{
        return false
      }
    }).catch(function (error) {
      res.json({
        promoName: promoInfo.promoName,
        promotionTile: promoInfo.promotionTile,
        playerid: "Quý khách chưa đủ điều kiện nhận khuyến mãi.",
        score: 0,
        bonus: 0,
        turnover:0,
        subject: "Bạn chưa đủ điều kiện để nhận khuyến mãi tại Hi88",
        content: "Bạn chưa đủ điều kiện để nhận khuyến mãi tại Hi88",
        startTime:startTime,
        endTime:endTime
      });
    });
  }else{
    return false
  }
} 
