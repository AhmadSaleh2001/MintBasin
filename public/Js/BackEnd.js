
// Start Change Image When User Choose
var ImageToChange = document.querySelector(".ImageToChange");
var ChangedInput = document.querySelector(".ChangedInput");
if(ImageToChange)
{
    ChangedInput.onchange = function()
    {
        var File = this.files[0];
        if(File)ImageToChange.setAttribute("src" , window.URL.createObjectURL(File));
    }
}
// End Change Image When User Choose