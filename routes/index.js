const adminController = require("../controller/adminController");
const middleware= require("../middleware/validateUserType")

// Wrote logic to verify token, but didn't generate token, because token is generated while doing signin.
// Able to write signin API. Please remove verifytoken to test logics
module.exports = function (app){
    app.post("/data/api/v1/adminuser", adminController.createAdminUser)
    app.get("/data/api/v1/adminuser/getalldata",[middleware.verifyToken], adminController.fetchAll)
    app.get("/data/api/v1/adminuser/getbynameoremail",[middleware.isAdmin, middleware.verifyToken], adminController.getbyNameOrEmail)
    app.put("/data/api/v1/adminuser/update",[middleware.isAdmin, middleware.verifyToken], adminController.updatedetails)
  
}