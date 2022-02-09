// Start Calculating
function GetFeedBack(Avg)
{
    if(Avg>=95)return "ساعد غيرك احسن ما ييجوا بحوض نعنع";
    else if(Avg>=90) return "حوض النعنع بعيد انت في امان :)";
    else if(Avg>=85)return "موقعك منيح حافظ عليه من حوض النعنع";
    else if(Avg>=80)return "انت مقرب عالحوض دير بالك";
    else if(Avg>=75)return "يا غالي انت في بداية حوض النعنع شد همتك";
    else if(Avg>=70)return "مبروك حوض النعنع غالي";
    else if(Avg>=65)return "والله قصتك قصة الله يعينك";
    else return "نزل جدولك كمان مرة  الفصل الجاي";   
}
function Calc()
{
    var Trs = Array.from(document.querySelectorAll(".MyTable > tbody > tr"));
    var L = Trs.length;
    var Sum = 0 , SumHours = 0;
    Trs.forEach(Item => {
        if(!Item.classList.contains("DontCalc"))
        {
            var ValueMaterial = parseInt(Item.children[1].children[0].value);
            var Hours = parseInt(Item.children[2].children[0].value);
            if(!ValueMaterial)ValueMaterial = 0;
            if(!Hours)Hours = 0;
            Sum+=ValueMaterial*Hours;
            SumHours+=Hours;
        }
        
    });

    var AvgAns = document.querySelector(".AvgAnswer");
    var HoursAnswer = document.querySelector(".HoursAnswer");
    var FeedBack = document.querySelector(".FeedBack");

    AvgAns.textContent = Sum/(SumHours?SumHours:1);
    HoursAnswer.textContent = SumHours;
    FeedBack.textContent = GetFeedBack(Sum/(SumHours?SumHours:1));


    var AvgAnsCum = document.querySelector(".AvgAnswerCum");
    var HoursAnswerCum = document.querySelector(".HoursAnswerCum");
    var FeedBackCum = document.querySelector(".FeedBackCum");
    
    var AvgCumulative = parseInt(document.querySelector(".AvgCumulative").value);
    var HoursCumulative = parseInt(document.querySelector(".HoursCumulative").value)    ;
    
    var AvgCumulativeAnswer = (AvgCumulative*HoursCumulative + Sum) / Math.max(1 , HoursCumulative+SumHours);
    AvgAnsCum.textContent = AvgCumulativeAnswer;
    HoursAnswerCum.textContent = HoursCumulative+SumHours;
    FeedBackCum.textContent = GetFeedBack(AvgCumulativeAnswer);
}

var NumberOfMaterial = document.getElementById("NumberOfMaterial");
    NumberOfMaterial.oninput = ()=>{
        var Content = document.querySelector(".Content");
        Content.innerHTML = "";
        
        Content.innerHTML = 
        `
        <table class="MyTable">
            <thead>
            <tr>
                <th>#</th>
                <th>علامة المادة</th>
                <th>عدد الساعات</th>
                <th>عمليات</th>
            </tr>
            </thead>
            <tbody>
            
            </tbody>
        </table>
        `;
        
        var TBody = document.querySelector(".MyTable > tbody");
        var Value = NumberOfMaterial.value;
        
    
    
        for(let i=1;i<=Value;i++)
        {
            var Tr = document.createElement("tr");
    
            var Td1 = document.createElement("td");
            Td1.appendChild(document.createTextNode(i));
    
    
            var Td2 = document.createElement("td");
            let Input1 = document.createElement("input");
            Input1.type = "number";
            Input1.setAttribute("value" , 0);
            Input1.setAttribute("min" , 0);
            Input1.setAttribute("max" , 100);
            Td2.appendChild(Input1);
    
            var Td3 = document.createElement("td");
            let Input2 = document.createElement("input");
            Input2.type = "number";
            Input2.setAttribute("value" , 0);
            Input2.setAttribute("min" , 0);
            Input2.setAttribute("max" , 100);
            Td3.appendChild(Input2);
    
    
            var Td4 = document.createElement("td");
            let Btn = document.createElement("button");
            Btn.textContent = "عدم احتساب المادة";
            

            Td4.appendChild(Btn);
    
            Tr.appendChild(Td1);
            Tr.appendChild(Td2);
            Tr.appendChild(Td3);
            Tr.appendChild(Td4);
            
            TBody.appendChild(Tr);
        }

        /* Start Add For Cumulative Average */
            Content.innerHTML+=
            `
            <div class="CumulativeAvg">
                <div class="Item">
                    <h4>المعدل التراكمي(بدون الفصل الحالي) : </h4>
                    <input type="number" min="0" max="100" value="0" step="0.01" name="" class="AvgCumulative" id="">
                </div>
                <div class="Item">
                    <h4>عدد الساعات التراكمي(بدون الفصل الحالي) : </h4>
                    <input type="number" min="0" max="100" value="0" step="0.01" name="" class="HoursCumulative" id="">
                </div>
            </div>
            `;
        /* End Add For Cumulative Average */
        
        var AllBtns = Array.from(document.querySelectorAll(".MyTable button"));
        AllBtns.forEach(Btn => {
                Btn.addEventListener("click" , function(){
                    var CurrTr = Btn.parentElement.parentElement;
                    if(CurrTr.classList.contains("DontCalc"))Btn.textContent = "عدم احتساب المادة";
                    else Btn.textContent = "احتساب المادة";
        
                    Btn.classList.toggle("DontCalc");
                    CurrTr.classList.toggle("DontCalc");
                    Calc();
                });
        })
        var CalcAvg = document.createElement("button");
        CalcAvg.textContent = "حساب المعدل";
        CalcAvg.classList.add("CalcAvg");
        CalcAvg.addEventListener("click" , function(){
            Calc();
        })
        Content.appendChild(CalcAvg);
    }

// End Calculating



