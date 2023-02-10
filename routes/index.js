const adminController = require("../controller/adminController");


module.exports = function (app){
    app.post("/data/api/v1/adminuser", adminController.createAdmin)
}