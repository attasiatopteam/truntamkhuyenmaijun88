const express = require('express')
const app = express()
const cors = require('cors')
const connectDb = require('./api/v1/config/database')
const router= require("./api/v1/routers")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
connectDb()
router(app)

app.listen('3000',async()=>{
    console.log('Server running at port 3000')
})

