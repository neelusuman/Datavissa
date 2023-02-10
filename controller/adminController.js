const Data = require("../models/AdminUser");


exports.createAdmin = async (req,res) =>{
    const data = await Data.create(req.body);
    res.status(201).send(data);
}
