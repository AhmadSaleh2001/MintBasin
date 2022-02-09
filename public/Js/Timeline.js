let Posts = document.querySelector(".Posts");
let Offset = 5;
window.onscroll = function()
{
    var Top = document.documentElement.scrollTop;
    var ClientHeight = document.documentElement.clientHeight;
    var Height = document.documentElement.offsetHeight;
    
    if(Top + ClientHeight >= Height-200)
    {
        var Xml = new XMLHttpRequest();
        Xml.onreadystatechange = function()
        {
            if(this.readyState == 4 && this.status == 200)
            {
                var JsData = JSON.parse(this.responseText);
                
                let DataPosts= JsData.Data;
                let UserInSession = JsData.User;
                for(let Item of DataPosts)
                {
                    var HaveDate = new Date(Item.createdAt);
                    var Year = HaveDate.getFullYear();
                    var Month = HaveDate.getMonth() + 1;
                    var Day = HaveDate.getDate();
                    var Hours = HaveDate.getHours();
                    var Minutes = HaveDate.getMinutes();
                    var State = Hours>=12?"PM":"AM";
                    var Can = UserInSession.IsAdmin || UserInSession._id == Item.UserId;
                

                    if(Hours>=12)
                    {
                        Hours-=12;
                        if(!Hours)Hours = 12;
                    }
                    if(Month<10)Month = "0" + Month;
                    if(Day<10)Day = "0" + Day;
                    if(Hours<10)Hours = "0" + Hours;
                    if(Minutes<10)Minutes = "0" + Minutes;
                    Posts.innerHTML+=
                    `
                    <div class="Item">
                                <div class="Header">
                                    <div>
                                        <img src="/public/Uploads/Users/${Item.Picture}" alt="">
                                        <div>
                                            <h4><Item.Username></h4>
                                            <h5>
                                                ${Day}-${Month}-${Year} -- ${Hours}:${Minutes}:${State}
                                            </h5>    
                                        </div>
                                    </div>
                                    ${Can?`
                                    <div>
                                        <a href="/Timeline/Update/${Item._id}/${Item.UserId}" class="fas fa-edit" style="color:#24a0ed"></a>
                                        <a href="/Timeline/Delete/${Item._id}/${Item.UserId}"><i class="fas fa-trash" style="color:red"></i></a>
                                    </div>
                                `:``}
                                </div>
                                <div class="Content">
                                    <p>${Item.Description}</p>
                                    <img src="/public/Uploads/Posts/${Item.Image}" alt="">
                                </div>
                            </div>

                    `;
                }
            }
        }
        
        Xml.open("GET" , "/Timeline/api/" + Offset,false)
        Xml.send();
        Offset+=5;
    }
}