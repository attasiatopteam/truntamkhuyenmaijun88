let conditionFn =(result)=>{
    let ticketId = result.data[0].txnid
    if(ticketId.slice(-7)=='7777777'){
        finalize[0]=7777777
    }else if(ticketId.slice(-6)=='777777'){
        finalize[0]=777777
    }else if(ticketId.slice(-5)=='77777'){
        finalize[0]=77777
    }else if(ticketId.slice(-4)=='7777'){
        finalize[0]=7777
    }else if(ticketId.slice(-3)=='777'){
        finalize[0]=777
    }else if(ticketId.slice(-2)=='77'){
        finalize[0]=77
    }else{
        finalize[0]=0
    }
    return finalize[0]
};conditionFn(result)

