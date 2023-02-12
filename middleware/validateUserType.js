const Data = require("../models/AdminUser");
const constants= require("../utils/constants")
let tokenconfig = require("../configs/token.configs")

const jwt = require("jsonwebtoken");


const isAdmin = async (req, res, next) => {
    const user = await Data.findOne({
        userId: req.body.id
    })

    if (user && user.Role == constants.UserType.admin) {
        next();
    } else {
        res.status(403).send({
            message: "Require Admin Role!"
        })
        return;
    }
}
// Wrote logic to verify token, but didn't generate token, because token is generated while doing signin.
// Able to write signin API
verifyToken = (req,res,next)=>{

    let token = req.headers['x-access-token'];

    if(!token){
        return res.status(403).send({message:"No Token Provided"});
    }

    jwt.verify(token, tokenconfig.secret, (err,decoded)=>{

        if(err){
            return res.status(401).send({message:"Unauthorized!"});
        }
        req.id =  decoded.id;
        next();
    })
}
module.exports={
    isAdmin: isAdmin,
    verifyToken: verifyToken
}