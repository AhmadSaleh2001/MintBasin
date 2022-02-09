var Passport = require("passport");
var Strategy = require("passport-local").Strategy;
var UserModel = require("../models/User")
Passport.use(new Strategy({usernameField : "Email" , passwordField : "Password"} , 
    async(Username , Password , Done) => 
    {
        var Search = await UserModel.findOne({Email : Username});
        if(!Search)return Done(null , false , {message : "هذا الحساب غير موجود"});
        else if(Search.Password == Password)return Done(null , Search);
        else return Done(null , false , {message : "كلمة المرور خاطئة"});
    }
))

Passport.serializeUser((User , Done) => {
    Done(null , User.id);
})

Passport.deserializeUser(async(User , Done) => {
    var Search = await UserModel.findById(User.id);
    Done(null , Search);
})


module.exports = Passport;