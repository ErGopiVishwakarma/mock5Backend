const express = require('express')
const cors = require('cors')
const connection = require('./db')
const userRouter = require('./route/userRoute')
const doctorRouter = require('./route/doctorRoute')

const app = express()
app.use(express.json())
app.use(cors())

// user route here 
app.use('/user',userRouter)

// doctor route here 
app.use('/doctor',doctorRouter)

app.listen(8080,async()=>{
    try {
        await connection
        console.log('connected to db..')
    } catch (error) {
        console.log(error)
    }
})