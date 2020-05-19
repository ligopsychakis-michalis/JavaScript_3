//initialize some variables
let buttonNumbers = false;
let buttonYears = false;
let input = document.getElementById("input");


//API call for Numbers or Years Facts
function callFacts(){
    const num = input.value;
    //API call only if there is an input
    if (num === ""){
        document.querySelector(".fact").style.display = "none";
    }else{
        //API call based on the button that clicked last 
        const xhr = new XMLHttpRequest();
        if (buttonNumbers === true){
            xhr.open("GET", `http://numbersapi.com/${num}`, true);
        }else{
            xhr.open("GET", `http://numbersapi.com/${num}/year`, true); 
        } 

        xhr.send();
        xhr.addEventListener("load",function(){
            if (xhr.status === 200){
                showFact(xhr.responseText);
            }else {console.log("Error on request...")}    
        });

        xhr.addEventListener("error", () => console.log("Error on request..."));   
    }   
}


//render the fact on DOM
function showFact(res){
    if (buttonNumbers === true){
        document.getElementById("fact-title").innerText = "Number Fact"
    }else if (buttonYears === true){
        document.getElementById("fact-title").innerText = "Year Fact"
    }
    document.getElementById("fact-para").innerText = res;
    document.querySelector(".fact").style.display = "block";
    /* check here too if input.value === 0 cause response comes asynchronously
    and if delete input realy quick, the fact remaines */
    if (input.value === ""){
        document.querySelector(".fact").style.display = "none";
    }
}


//EVENT: when button 'Numbers' clicked show input bar and change url
document.getElementById("btn-numbers").addEventListener("click", () => {
    input.style.display = "block";
    buttonNumbers = true;
    buttonYears = false;

    if (input.style.display === "block"){ 
        callFacts() 
    }
});


//EVENT: when button 'Years' clicked show input bar and change url
document.getElementById("btn-years").addEventListener("click", () => {
    input.style.display = "block";
    buttonNumbers = false;
    buttonYears = true;

    if (input.style.display === "block"){ 
        callFacts() 
    }
});


//event: when 'input', make the API call
input.addEventListener("input", callFacts);
