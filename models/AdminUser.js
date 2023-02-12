const mongoose= require("mongoose")
const constants= require('../utils/constants')

const modelSchema= new mongoose.Schema({
    FirstName:{
        type: String,
        required: true
    },
    MiddleName:{
        type: String
    },
    LastName:{
        type: String,
        required: true
    },
    Email:{
        type: String,
        required: true
    },
    Password:{
        type: String,
        required: true,
        min: 6,
        max: 12
    },
    Role:{
        type:String,
        required:true,
        default:constants.UserType.User,
    },
    Department:{
   type:String
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    },
   
})

module.exports= mongoose.model("Data",modelSchema)