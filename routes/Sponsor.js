var Express = require("express");
var Router = Express.Router();
var SponsorController = require("../controllers/SponsorController");
var Path = require("path");
var Multer = require("multer");
const Storage = Multer.diskStorage({
    destination : (Req , File , Cb)=>{
        Cb(null , "public/Uploads/Sponsors")
    },
    filename : (Req , File , Cb) => {
        Cb(null , Date.now() + "-" + Req.session.User.Username + Path.extname(File.originalname));
    }
})
var {Auth , NotAuth , IsAdmin} = require("../Auth/Auth");
var Upload = Multer({storage : Storage});
Router.get("/ManageSponsors", IsAdmin , SponsorController.Show);
Router.get("/Add" , IsAdmin , SponsorController.Add);
Router.post("/Add" , Upload.single("Image") , IsAdmin , SponsorController.ConfirmAdd);
Router.get("/Delete/:Id" , IsAdmin , SponsorController.Delete);
Router.get("/Update/:Id" , IsAdmin , SponsorController.Update);
Router.post("/Update/:Id" , Upload.single("Image") , IsAdmin , SponsorController.ConfirmUpdate);


module.exports = Router;