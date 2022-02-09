var Express = require("express");
var Router = Express.Router();
var PostController = require("../controllers/PostController");
var Path = require("path");
var Multer = require("multer");
var {Auth , NotAuth} = require("../Auth/Auth");
var Storage = Multer.diskStorage({
    destination : (Req , File , Cb) =>
    {
        Cb(null , "public/Uploads/Posts");
    },
    filename : (Req , File , Cb) =>{
        Cb(null , Date.now() + "-" + Req.session.User.Username + Path.extname(File.originalname));
    }
})
var Owner = (Req , Res , Next)=>
{
    if(Req.session.User.IsAdmin || Req.session.User._id == Req.params.UserId)Next();
    else Res.redirect("/Timeline");
}
var Upload = Multer({storage : Storage});
Router.get("/" , PostController.Index);
Router.post("/Share" , Upload.single("Image") , Auth , PostController.Share);
Router.get("/Delete/:Id/:UserId" , [Auth , Owner] , PostController.Delete);
Router.get("/Update/:Id/:UserId" , [Auth , Owner] , PostController.Update);
Router.post("/Update/:Id/:UserId" , Upload.single("Image") , [Auth , Owner] , PostController.ConfirmUpdate);
Router.get("/api/:Offset" , PostController.GetDataOnScroll);

module.exports = Router;