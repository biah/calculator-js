function calculator_js(){
    let btn = document.getElementsByClassName('cal-number');
    let question_div = document.getElementById('cal-question');
    let operation_sign = document.getElementsByClassName("operation");
    let screen_div = document.getElementById("cal-screen");
    let btns = document.getElementsByClassName("cal-btn");
    let answer_div = document.getElementById("cal-answer");
    let symbols = document.getElementsByClassName("cal-symbol");
    let special = document.getElementsByClassName("cal-special");
    let ignore_keys = ["DEL","="]

    for (let i in btns){
        let e = btns[i];
        e.onclick =  function(){
            if (ignore_keys.includes(e.innerText))
                return
            question_div.innerText += e.innerText;
            screen_div.style.padding = "20px";
        }
    }
    document.getElementById("delete-all").addEventListener("click", function(){
        question_div.innerText = "";
        screen_div.style.padding = "40px";
    });
    document.getElementById("delete").addEventListener("click", function(){
        question_div.innerText = question_div.innerText.slice(0,question_div.innerText.length -1);
        if (question_div.innerText.length == 0)
            screen_div.style.padding = "40px";
    })

    function sanitize_eqn(eqn){
        pi_regex = /\d+π/g;
        var safe = eqn.replace(pi_regex, function(match) {return match.split("π")[0]+`*π`;});;
        console.log(safe);
        safe = eqn.replaceAll("×", "*");
        safe = eqn.replaceAll("÷", "/");
        safe = eqn.replaceAll("π", math.PI);
        
        //return safe
    }
    document.getElementById("solve").addEventListener("click", function(){
        try{
        if (question_div.innerHTML.length == 0){
            answer_div.innerText = 0;
            return;
        }
        var eqn = question_div.innerHTML;
        safe = sanitize_eqn(eqn);
        //answer_div.innerText = math.evaluate(safe);
        }
        catch(err){
            if (err.name == 'SyntaxError')
                answer_div.innerText = "Syntax Error";
            else
                console.log(err.name + err.message);
        }
    })
}
window.onload = (calculator_js());