const Data = require("../models/AdminUser");
const constants= require("../utils/constants")
const bcrypt= require("bcryptjs")
const config = require("../configs/token.configs")
const jwt = require("jsonwebtoken");

 // controller to create Admin or User with details, this will run with all neccessary field, if not provide will throw error. It will without neccesary fields like department
exports.createAdminUser= async (req,res) =>{ 
    const obj= {
    FirstName:req.body.FirstName,
    MiddleName:req.body.MiddleName,
    LastName: req.body.LastName,
    Email:req.body.Email,
    Role: req.body.Role,
    Department:req.body.Department,
    Password :bcrypt.hashSync(req.body.Password, 8)
    }
    try{
    const data = await Data.create(obj);
    res.status(201).send(data);
    }catch(err){
        res.status(500).send({
            message: "Some internal error occured"
        })  
    }
   
}

// Fetch details with email or name , similarly we can pass lastname also to fetch data
exports.getbyNameOrEmail= async(req, res)=>{
const query={};
    
if(req.query.FirstName!=undefined){
    query.FirstName=req.query.FirstName;
}
else if(req.query.Email!=undefined){
    query.Email= req.query.Email;
}
try{
const data = await Data.find(query);
res.status(200).send(data);
}catch(err){
    console.err("error while fetching the Name or email : ", query.FirstName);
        res.status(500).send({
            message: "Some internal error occured"
        })
}
}
// Admin can fetch all data, but user can fetch only user's data
exports.fetchAll= async(req,res )=>{
    const savedUser = await Data.findOne({id: req.body.Id })
    console.log(savedUser.Role)
try{
    if(savedUser.Role == constants.UserType.User){  //error in getting only user's data
       let userdata= await Data.find({
        where: {
            Role: constants.UserType.User
           
        }
       })
       res.status(200).send(userdata)
    }
    else {
    let alldata= await Data.find();
    res.status(200).send(alldata)
}
}catch(err){
    res.status(500).send({
        message: "Some internal error occured"
    })  
}
}
// To update details
exports.updatedetails = async (req,res)=>{

    const id= req.params.id;

    const savedData= await Data.findOne({id:id});
    console.log(savedData)
    
    if(!savedData){
        res.status(400).send("Data to be updated doesn't exists");
    }

    savedData.FirstName = req.body.FirstName ? req.body.FirstName : savedData.FirstName;
    savedData.LastName = req.body.LasttName ? req.body.LastName : savedData.LastName;
    savedData.Email = req.body.Email? req.body.Email: savedData.Email;
    savedData.Description = req.body.Description ? req.body.Description: savedData.Description;

    const updatedData = await savedData.save();

    res.status(200).send(updatedData);
}

