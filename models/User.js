var Mongoose = require("mongoose");
var Schema = Mongoose.Schema;
var UserModel = new Schema({
    Username : {
        type : String,
        required : true
    },
    Email : {
        type : String,
        required : true
    },
    Password : {
        type : String,
        required : true
    },
    Picture : {
        type : String,
        default : "DefaultImage.jpg"
    },
    IsAdmin : {
        type : Boolean,
        default : false
    }
})


var User = Mongoose.model("User" , UserModel);

module.exports = User;