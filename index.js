require('dotenv').config()
const express = require('express')
const cors = require('cors')
require('./db/connection')

const router = require('./routes/router')
const middleware= require('./middleWare/authmiddleware')




// Create an express application
const hospitalServer = express()

// use cors
hospitalServer.use(cors())
// use json parser in server
hospitalServer.use(express.json())
// middleware
hospitalServer.use(middleware.appMiddleware)


// use router(it is given after cors and express)
hospitalServer.use(router)


// Setup port number to listen server
const port = 3000 || process.env.PORT
// run or listen server app
hospitalServer.listen(port,()=>{
    console.log(`Hospital server started at port no:${port}`);

})
// get request
hospitalServer.get("/",(req,res)=>{
    res.status(200).send(`<h1>Hospital server started</h1>`)

})
