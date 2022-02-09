var Express = require("express");
var Mongoose = require("mongoose");
var Session = require("express-session");
var MongoStore = require("connect-mongo")
var Flash = require("express-flash");
var Passport = require("./Passport/Passport");
var App = Express();
// const Url = "mongodb+srv://Ahmad:Ahmad123@cluster0.kjdjs.mongodb.net/First?retryWrites=true&w=majority";
const Url = "mongodb://127.0.0.1:27017/MintBasin";
var PORT = process.env.PORT || 1212;
Mongoose.connect(Url)
.then(Ac => {
    App.listen(PORT , ()=>{
        console.log("Running ...");
    })
})
.catch(X => console.log("Error ... Server Not Working"));
App.set("view engine" , "ejs");
App.use(Express.json());
App.use(Express.urlencoded({extended : true}));
App.use("/public" , Express.static("public"));
App.use(Flash());
App.use(Session({
    secret : "Ahmad Saleh Here",
    resave : true,
    saveUninitialized : false,
    store : new MongoStore({mongoUrl : Url})
}))

App.use(Passport.initialize());
App.use(Passport.session());
App.use((Req , Res , Next)=>{
    Res.locals.User = Req.session.User || undefined;
    Res.locals.ErrorMessage = Req.flash("ErrorMessage");
    Res.locals.Url = Req.url;
    Next();
})
var Sponsor = require("./models/Sponsor");
App.get("/" , async(Req , Res) => {
    var Sponsors = await Sponsor.find();
    Res.render("index" , {"Sponsors" : Sponsors , "Title" : "الصفحة الرئيسية"});
});
 
App.get("/Calculate" , (Req , Res) => {
    Res.render("Calculate" , {Title : "حساب المعدل"});
})


var UserRoutes = require("./routes/User");
App.use("/User" , UserRoutes);


var SponsorRoutes = require("./routes/Sponsor");
App.use("/Sponsor" , SponsorRoutes);


var RatingRoutes = require("./routes/Rating");
App.use("/Rating" , RatingRoutes);

var PostRoutes = require("./routes/Post");
App.use("/Timeline" , PostRoutes);

App.use((Req , Res) => {
    Res.render("404" , {"Title" : "Page Not Found"});
})

