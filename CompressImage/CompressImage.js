var File = require("fs");   
var Sharp = require("sharp");
Sharp.cache(false);
var Path = require("path");
var Compress = (Full)=>
{
    Sharp(Full).jpeg({quality : 10}).withMetadata().toBuffer((Err , Buffer)=>{
        File.writeFile(Full , Buffer, (Err)=>
        {
            if(Err)console.log("Error When Reduce Image Quality");
        }) 
    });
}

module.exports = {
    Compress
}