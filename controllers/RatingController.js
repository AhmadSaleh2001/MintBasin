var RatingModel = require("../models/Rating");


var ShowAll = async(Req , Res) => {
    var Data = await RatingModel.find();
    Res.render("Rating/Show" , {"Data" : Data , "Title" : "التقييمات"});
}

var Add = (Req , Res) => {
    Res.render("Rating/AddRating" , {"Title" : "اضافة تقييم جديد"});
}

var ConfirmAdd = async(Req , Res) => {

    await RatingModel.create(Req.body);

    Res.redirect("/Rating/");
}

var Delete = async(Req , Res)=>
{
    try
    {
        await RatingModel.findByIdAndDelete(Req.params.Id)
    }
    catch(Err)
    {
        console.log("Rate Not Deleted ... Rate Not Found");
        Res.redirect("/!");
        return;
    }
    Res.redirect("/Rating/");
}


module.exports = {
    ShowAll,
    Add,
    ConfirmAdd,
    Delete
};