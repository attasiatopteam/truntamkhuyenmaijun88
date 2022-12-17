const axios = require('axios')
module.exports = {
    tt08: (startTime,endTime,promoInfo,result,authorization)=>{
        var value = []
        var sport = [] 
        var config = {
            method: 'get',
            url: 'https://boapi.jun88.bet/jun88-ims/api/v1/reports/betting?'
            +'&starttime='+startTime
            +'&endtime='+endTime
            +promoInfo.url
            +"&zoneType=ASIA_SHANGHAI"
            +promoInfo.method+result.data[0].playerid,
            headers: { 
              'accept': ' */*', 
              'accept-encoding': ' gzip, deflate, br', 
              'accept-language': ' en-US,en;q=0.9,vi-VN;q=0.8,vi;q=0.7', 
              'authorization': authorization, 
              'origin': ' https://boapi.jun88.bet',  
              'referer': ' https://boapi.jun88.bet/', 
            }
        };
        console.log(config.url)
        return axios(config)
        .then(function (response) {
            let result = response.data
                result.data.forEach((el)=>{
                    if(el.producttypeid=="ESPORTS" || el.producttypeid=="SPORTS" ){
                        if(el.winloss>0){
                            value.push(el.winloss) 
                        }
                    }
                })
            value.sort(function(a, b){return b-a})
            return value
        }).catch(function (error) {
          console.log(error);
        });
    }
}