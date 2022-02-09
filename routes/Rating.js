var Express = require("express");
var Router = Express.Router();
var RatingController = require("../controllers/RatingController");
var {Auth , NotAuth} = require("../Auth/Auth");

Router.get("/" , RatingController.ShowAll);
Router.get("/Add" , RatingController.Add);
Router.post("/Add" , RatingController.ConfirmAdd);
Router.get("/Delete/:Id" , Auth , RatingController.Delete);

module.exports = Router;