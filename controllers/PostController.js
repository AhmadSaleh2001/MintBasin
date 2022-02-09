var Post = require("../models/Post");
var User = require("../models/User");
var File = require("fs");
var Path = require("path");
var {Compress} = require("../CompressImage/CompressImage");
var Index = async(Req , Res)=>{

    let AllPosts = await Post.find().sort({"updatedAt":-1}).limit(5);
    let AllData = [];
    for(let i=0;i<AllPosts.length;i++)
    {
        let UserId = AllPosts[i].UserId;
        let DataUser = await User.findById(UserId);
        var Obj = {};
        Obj._id = AllPosts[i]._id;
        Obj.UserId = AllPosts[i].UserId;
        Obj.Description = AllPosts[i].Description;
        Obj.Image = AllPosts[i].Image;
        Obj.createdAt = AllPosts[i].createdAt;
        Obj.updatedAt = AllPosts[i].updatedAt;
        Obj.Username = DataUser.Username;
        Obj.Picture = DataUser.Picture;
        AllData.push(Obj);
        
    }
    Res.render("Timeline/index" , {"Data" : AllData , "Title" : "احدث المنشورات"});
}

var Share = async(Req , Res)=>{
    var Data = Req.body;
    if(Req.file)Data.Image = Req.file.filename;
    Data.UserId = Req.session.User._id;
    await Post.create(Data);

    if(Req.file)
    {
        var Full = Path.resolve(__dirname , ".." , "public" , "Uploads" , "Posts" , Data.Image);
        Compress(Full);
    }
    

    Res.redirect("/Timeline");
}

var Delete = async(Req , Res)=>{

    try
    {
        var CurrPost = await Post.findById(Req.params.Id);
        if(CurrPost.Image)
        {
            File.unlink(Path.resolve(__dirname , ".." , "public" , "Uploads" , "Posts" , CurrPost.Image) , (Err) =>{
                if(Err)console.log("Cant Delete Image Post ... Image Not Found");
            });
        }

        await CurrPost.remove();
    }
    catch(Err)
    {
        console.log("Cant Delete Post ... Post Not Found");
        Res.redirect("/!");
        return;
    }
    
    Res.redirect("/Timeline");

}
var Update = async(Req , Res) => {
    try
    {
        var CurrPost = await Post.findById(Req.params.Id);
        Res.render("Timeline/EditPost" , {"Data" : CurrPost , "Title" : "تعديل منشور"});
    }
    catch(Err)
    {
        Res.redirect("/!");
        
    }
}
var ConfirmUpdate = async(Req , Res)=>
{
    let Data = {};
    Data.Description = Req.body.Description;
    if(Req.file)
    {
        Data.Image = Req.file.filename;
        File.unlink(Path.resolve(__dirname , ".." , "public" , "Uploads" , "Posts" , Req.body.OldImage) , (Err) =>{
            if(Err)console.log("Cant Delete Image Post ... Image Not Found");
        });

        var Full = Path.resolve(__dirname , ".." , "public" , "Uploads" , "Posts" , Data.Image);
        Compress(Full);
    
    }

    await Post.findByIdAndUpdate(Req.params.Id , {
        $set : Data
    });

    Res.redirect("/Timeline");
}
var GetDataOnScroll = async(Req , Res)=>{
    let Offset = Req.params.Offset;
    var Data = await Post.find().sort({"updatedAt":-1}).limit(5).skip(Offset);
    let MainData = {};
    let AllData = [];
    for(let i=0;i<Data.length;i++)
    {
        let UserId = Data[i].UserId;
        let DataUser = await User.findById(UserId);
        var Obj = {};
        Obj._id = Data[i]._id;
        Obj.UserId = Data[i].UserId;
        Obj.Description = Data[i].Description;
        Obj.Image = Data[i].Image;
        Obj.createdAt = Data[i].createdAt;
        Obj.updatedAt = Data[i].updatedAt;
        Obj.Username = DataUser.Username;
        Obj.Picture = DataUser.Picture;
        AllData.push(Obj);
        
    }
    MainData.Data = AllData;
    MainData.User = Req.session.User;
    Res.json(MainData);
}
module.exports = {
    Index,
    Share,
    Delete,
    Update,
    ConfirmUpdate,
    GetDataOnScroll
}