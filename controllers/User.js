var Path = require("path");
var User = require("../models/User");
var Post = require("../models/Post");
var File = require("fs");
var {Compress} = require("../CompressImage/CompressImage");
var SignIn = (Req , Res)=>{
    Res.render("user/SignIn" , {"Title" : "انشاء حساب"});
}

var ConfirmSignIn = async(Req , Res)=>
{
    var Search = await User.findOne({Email : Req.body.Email});
    if(!Search)await User.create(Req.body);
    else
    {
        Req.flash("ErrorMessage" , "عذرا ... البريد الالكتروني الذي ادخلته مستخدم من قبل");
        Res.redirect("/User/SignIn");
    }
    Res.redirect("/User/Login");
}

var Login = (Req , Res)=>
{
    Res.render("user/Login" , {"Title" : "تسجيل الدخول"});
}

var ConfirmLogin = (Req , Res)=>
{
    Req.session.User = Req.user;
    Res.redirect("/");
}

var Logout = (Req , Res) =>{
    Req.session.destroy();
    Req.logout();
    Res.redirect("/");
}

var Update = async(Req , Res) => {
    try
    {
        var Data = await User.findById(Req.params.Id);
        Res.render("user/Update" , {"Data" : Data , "Title" : "تعديل البيانات"});
    }
    catch(Err)
    {
        Res.redirect("/!");
        return;
    }
    
}

var ConfirmUpdate = async(Req , Res) => {
    var NewImage = Req.file?1:0;
    var NewData = Req.body;
    if(NewImage)
    {
        if(NewData.Picture!="DefaultImage")
        {
    
            File.unlink(Path.resolve(__dirname , ".." , "public" , "Uploads" , "Users" , NewData.OldImage) , (Err)=>
            {
                if(Err)console.log("Something Error When Delete Image For User");
            });
            
        }
        NewData.Picture = Req.file.filename;
        var Full = Path.resolve(__dirname , ".." , "public" , "Uploads" , "Users" , NewData.Picture);
        Compress(Full);
    }
    delete NewData.OldImage;
    
    await User.findByIdAndUpdate(Req.params.Id , {
        $set : NewData
    })
    var New = await User.findById(Req.params.Id);
    
    Res.redirect("/User/Update/" + Req.params.Id);
    
}

var ShowAll = async(Req , Res) => 
{
    var Data = await User.find();
    Res.render("user/Show" , {"Data" : Data , "Title" : "ادارة المستخدمين"});
}
var Delete = async(Req , Res)=>
{
    let Data = {};
    try
    {
        Data = await User.findById(Req.params.Id);
    }
    catch(Err)
    {
        Res.redirect("/!");
        return;
    }
    if(Data.Picture!="DefaultImage.jpg")
    {
        var DeletePath = Path.resolve(__dirname , ".." , "public" , "Uploads" , "Users" , Data.Picture);
        File.unlink(DeletePath , (Err)=>
        {
            if(Err)console.log("(Function Delete In User)Something Error When Delete Image For User");
        });
    }
    Data.remove();
    
    Res.redirect("/");

}

var Profile = async(Req , Res)=>{
    try
    {
        var UserProfile = await User.findById(Req.params.Id);
    }
    catch(Err)
    {
        Res.redirect("/!");
        return;
    }
    var Posts = await Post.find({UserId : UserProfile._id}).sort({"updatedAt" : -1});
    Res.render("user/Profile" , {"DataUser" : UserProfile , "Posts" : Posts , "Title" : "الملف الشخصي"});
};
module.exports = {
    SignIn,
    ConfirmSignIn,
    Login,
    ConfirmLogin,
    Logout,
    Update,
    ConfirmUpdate,
    ShowAll,
    Delete,
    Profile
};