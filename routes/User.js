var Express = require("express");
var Router = Express.Router();
var UserController = require("../controllers/User")
var Passport = require("../Passport/Passport")
var Multer = require("multer");
var Path = require("path");
const Storage = Multer.diskStorage({
    destination : (Req , File , Cb) =>
    {
        Cb(null , "public/Uploads");
    },
    filename : (Req , File , Cb) => {
        Cb(null , Req.session.User._id + "-" + Date.now() +  Path.extname(File.originalname));
    }
})
var Upload = Multer({storage : Storage});
var {Auth , NotAuth , IsAdmin , IsMe} = require("../Auth/Auth");
Router.get("/SignIn" , NotAuth , UserController.SignIn);
Router.post("/SignIn" , UserController.ConfirmSignIn);
Router.get("/Login" , NotAuth , UserController.Login);
Router.post("/Login" , Passport.authenticate("local" , {
    failureRedirect : "/User/Login",
    failureFlash : true
}) , UserController.ConfirmLogin);
Router.get("/Logout" , Auth , UserController.Logout);
Router.get("/Update/:Id" , [IsMe] , UserController.Update);
Router.post("/Update/:Id" , Upload.single("Picture") , IsMe , UserController.ConfirmUpdate);
Router.get("/ManageUsers" , [IsAdmin] , UserController.ShowAll);
Router.get("/Delete/:Id" , [IsMe] , UserController.Delete);
Router.get("/Profile/:Id" , UserController.Profile);




module.exports = Router;