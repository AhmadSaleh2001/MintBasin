var Auth = (Req , Res , Next) => 
{
    if(Req.session.User)Next();
    else Res.redirect("/User/Login");
}
var NotAuth = (Req , Res , Next) => 
{
    if(Req.session.User)Res.redirect("/");
    else Next();
}

var IsAdmin = (Req , Res , Next) => 
{
    if(Req.session.User && Req.session.User.IsAdmin)Next();
    else Res.redirect("/");
}
var IsMe = (Req , Res , Next)=>
{
    if(Req.session.User && (Req.session.User.IsAdmin || Req.session.User._id == Req.params.Id))Next();
    else Res.redirect("/");
}

module.exports = {
    Auth,
    NotAuth,
    IsAdmin,
    IsMe
}