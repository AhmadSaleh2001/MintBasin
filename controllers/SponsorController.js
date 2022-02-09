var Sponsor = require("../models/Sponsor");
var File = require("fs");
var Path = require("path");
var {Compress} = require("../CompressImage/CompressImage");
var Show = async(Req , Res) => {

    var Data = await Sponsor.find();
    Res.render("Sponsor/Show" , {"Data" : Data , "Title" : "المساهمين"})
}

var Add = (Req , Res)=>
{
    Res.render("Sponsor/Add" , {"Title" : "اضافة مساهم"});
}

var ConfirmAdd = async(Req , Res)=>
{
    var Data = Req.body;
    if(Req.file)Data.Image = Req.file.filename;
    else Data.Image = "DefaultImage.jpg";

    if(Req.file)
    {
        var Full = Path.resolve(__dirname , ".." , "public" , "Uploads" , "Sponsors" , Data.Image);
        Compress(Full);
    }
    
    await Sponsor.create(Data);
    Res.redirect("/");
}

var Update = async(Req , Res)=>{
    
    try
    {
        var Data = await Sponsor.findById(Req.params.Id);
    }
    catch(Err)
    {
        console.log("Something Error ... Sponsor Not Updated");
    }

    Res.render("Sponsor/Update" , {"Data" : Data , "Title" : "تعديل بيانات المساهم"});
}
var ConfirmUpdate = async(Req , Res)=>{
    
    var Data = Req.body;
    if(Req.file)Data.Image = Req.file.filename;
    
    var CurrSponsor = await Sponsor.findById(Req.params.Id);
    if(CurrSponsor.Image!="DefaultImage.jpg" && Req.file)
    {
        File.unlink("public/Uploads/Sponsors/" + CurrSponsor.Image , (Err)=>{
            console.log("Sponsor : Something Error When Update Old Picture");
        })
        

        var Full = Path.resolve(__dirname , ".." , "public" , "Uploads" , "Sponsors" , Data.Image);
        Compress(Full);
    
    }

    await Sponsor.findByIdAndUpdate(Req.params.Id , {
        $set : Data
    })

    Res.redirect("/Sponsor/ManageSponsors");
}

var Delete = async(Req , Res)=>{
    var Data = await Sponsor.findById(Req.params.Id);
    if(Data.Image!="DefaultImage.jpg")File.unlink("public/Uploads/Sponsors/" + Data.Image , (Err)=>{
        if(Err)console.log("Sponsor : Something Error When Delete Sponsor With His Image");
    });

    await Sponsor.findByIdAndDelete(Req.params.Id);

    Res.redirect("/Sponsor/ManageSponsors")
}

module.exports = {
    Show,
    Add,
    ConfirmAdd,
    Delete,
    Update,
    ConfirmUpdate
}