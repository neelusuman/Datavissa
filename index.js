const express= require("express")
const bodyParser= require("body-parser")
const mongoose= require("mongoose")

const serverConfig = require('./configs/server.configs'); // Server configuration
const dbConfig = require('./configs/db.configs')

const app= express();
app.use(bodyParser.json())

mongoose.connect(dbConfig.DB_URL,()=>{ // server configuration

    console.log("connected to mongoDB")
},err=>{
    console.log("Error:",err.message)
})

require("./routes/index")(app);//  importing routes
app.listen(serverConfig.PORT,()=>{ // Listening to the server
    console.log(`Application is running on port ${serverConfig.PORT}`) //Using port number as varible, because it's best practice
})