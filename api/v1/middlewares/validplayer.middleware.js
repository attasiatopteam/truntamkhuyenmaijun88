const axios = require('axios');
module.exports = (playerId,authorization)=>{
    var config = {
      method: 'get',
      url: 'https://boapi.jun88.bet/jun88-ims/api/v1/players/'+playerId,
      headers: { 
        'Authorization': authorization, 
        'Cookie': '__cf_bm=Qbwh7OJek5iG6fYeZw1B_3gHvj3yK.7IEaSeWfOkFoY-1670508539-0-ATDCHdkFG2tPFqQujvDg9VDq9WXvjtXxdIe4jwTbX85Jc3avQjDL8QM7QYEiPJZES/KgwThrlUS8sAak7QfFDFg='
      }
    };
    
    return axios(config)
    .then(function (response) {
      if(response.data.vipid!="63539055-e5e8-4cde-8f03-0af4f73d6d91"){
          var config = {
              method: 'get',
              url: 'https://boapi.jun88.bet/jun88-ims/api/v1/players/'+response.data.playerid+'/cashsummary',
              headers: { 
                'Authorization': authorization, 
                'Cookie': '__cf_bm=zHOGCWQf5WSRdPLx_YpLSfCsPaiF1ADUfPAbS6qUD6g-1670511599-0-AVQTUgWiKoM+bNCsMRjfoR1ZLW/ASfXLilE6djg1191F8MY9pFhYU5YE6DiKwwA5M8m1sP0pty3eFMAQtURQ2Wg='
              }
            };
            return axios(config).then(function (response) {
                if(response.data.totaldeposit!=0){
                  return "valid"
                }else{
                  return "invalid"
                }
            }).catch(function (error) {
              console.log(error);
            });
      }else{
          return "invalid"
      }
    }).catch(function (error) {
      console.log(error);
    });
}