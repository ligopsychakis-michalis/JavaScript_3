// //API with XMLHttpRequest
// function apiXHR(){
//     let xhr = new XMLHttpRequest();

//     xhr.open("GET", "https://xkcd.com/info.0.json", true);

//     xhr.send();

//     xhr.addEventListener("load", () => {
//         if (xhr.status === 200){
//             res = JSON.parse(xhr.responseText);
//             console.log(res);
//             //render img on DOM
//             const body = document.body;
//             const img = document.createElement("img");
//             img.src = res.img;
//             body.appendChild(img);
//         }else { console.log("Error on request...") }
//     });

//     xhr.addEventListener("error", () => console.log("Error on request..."));
// }

// apiXHR();


// //API with Axios
// function apiAxios(){
//     axios
//         .get("https://xkcd.com/info.0.json")
//         .then(res => {
//             console.log(res.data)
//             //render img on DOM
//             const body = document.body;
//             const img = document.createElement("img");
//             img.src = res.data.img;
//             body.appendChild(img);
//         })
//         .catch(err => console.log(err));
// }

// apiAxios();



async function asyncAwait (){
    try{
    let res = await fetch("https://xkcd.com/info.0.json");
    console.log(res.data);
    }catch(err) { console.error(err) };  
}

asyncAwait();