var Mongoose = require("mongoose");
var Schema = Mongoose.Schema;
var RatingModel = new Schema({
    Name : {
        type : String,
        required : true
    },
    Rating : {
        type : Number,
        required : true
    },
    FeedBack : {
        type : String,
    }
} , {timestamps : true});

var Rating = Mongoose.model("Rating" , RatingModel);

module.exports = Rating;