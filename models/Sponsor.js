var Mongoose = require("mongoose");
var Schema = Mongoose.Schema;
var SponsorModel = new Schema({
    Name : {
        type : "String",
        required : true
    },
    Title : {
        type : "String",
    },
    Description : {
        type : "String",
        required : true
    },
    Image : {
        type : "String",
        default : "DefaultImage.jpg"
    },
    Facebook : {
        type : "String",
        default : "No Account"
    },
    LinkedIn : {
        type : "String",
        default : "No Account"
    },
    Instagram : {
        type : "String",
        default : "No Account"
    },
})

var Sponsor = Mongoose.model("Sponsor" , SponsorModel);

module.exports = Sponsor;
