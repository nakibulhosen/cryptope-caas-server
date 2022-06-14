// External import
const express = require("express")
const dotenv = require("dotenv")
const cors = require('cors')
const path = require('path')

// Internal import 
const { notFoundHandler, errorHandler } = require("./middleware/common/errorHandler")

const app = express()
dotenv.config()
const port = 5000

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// Application Route 
app.get('/', (req, res) => {
    res.send('Welcome to cryptope CaaS')
})

// 404 Not Found Handler 
app.use(notFoundHandler)

// Common Errror Handler
app.use(errorHandler)

app.listen(process.env.PORT || port, () => {
    console.log(`Cryptope CaaS is listening on port ${process.env.PORT}`)
})