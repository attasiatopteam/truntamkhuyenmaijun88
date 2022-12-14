const mongoose = require('mongoose')

const connectDb = async()=>{
    try {
        await mongoose.connect('mongodb+srv://itvinatt:1007mccl@cluster0.yyn9vwv.mongodb.net/jun88promotioncenter?retryWrites=true&w=majority')
        console.log('Database Connect Successfully')
    } catch (error) {
        console.log("Lỗi kết nối"+error)
    }
}

module.exports = connectDb
