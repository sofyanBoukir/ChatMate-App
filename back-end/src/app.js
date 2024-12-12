const express = require("express")
const app = express()
const routes = require("../src/routes/api")
const cors = require("cors")


app.use(express.json({ limit: '100mb' })); 

const corsOptions = {
    origin : " http://localhost:5173",
    methods : ['GET','POST','PUT','PATCH','DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(cors(corsOptions))
app.use(express.json())
app.use("/",routes)

module.exports = app