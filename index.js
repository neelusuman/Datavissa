const express= require("express")
const bodyParser= require("body-parser")
const mongoose= require("mongoose")

const serverConfig = require('./configs/server.configs');
const dbConfig = require('./configs/db.configs')

const app= express();
app.use(bodyParser.json())

mongoose.connect(dbConfig.DB_URL,()=>{
    console.log("connected to mongoDB")
},err=>{
    console.log("Error:",err.message)
})

require("./routes/index")(app);
app.listen(serverConfig.PORT,()=>{
    console.log(`Application is running on port ${serverConfig.PORT}`)
})