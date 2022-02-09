var Mongoose = require("mongoose");
var Schema = Mongoose.Schema;
var PostModel = new Schema({
    UserId : {
        type : String,
        required : true
    },
    Description : {
        type : String,
        required : true
    },
    Image : {
        type : String,
    },
} , {timestamps : true});

var Post = Mongoose.model("Post" , PostModel);

module.exports = Post;