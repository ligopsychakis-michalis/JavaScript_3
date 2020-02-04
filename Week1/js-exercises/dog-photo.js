//render dogs with XHR
function dogPhotosXHR(){
    const xhr = new XMLHttpRequest()
    xhr.open("GET", "https://dog.ceo/api/breeds/image/random", true);
    xhr.send();
    xhr.addEventListener("load", () => {
        if (xhr.status === 200){
            const res = JSON.parse(xhr.response);
            //append img in a new <li> 
            const li = document.createElement("li");
            li.innerHTML = `<img src = '${res.message}' width= 250 height= 250 style= 'margin: 3px'>`;
            document.getElementById("list").appendChild(li);
        }else { console.log("Error on request..."); }
    })

    xhr.addEventListener("error", () => console.log("Error on request..."))
}

document.getElementById("btn1").addEventListener("click", dogPhotosXHR);



//render dogs with Axios
function dogPhotosAxios(){
    axios
        .get('https://dog.ceo/api/breeds/image/random')
        .then(res => {
            //append img in a new <li>
            const li = document.createElement("li");
            li.innerHTML = `<img src = '${res.data.message}' width= 250 height= 250 style= 'margin: 3px'>`;
            document.getElementById("list").appendChild(li);
        })
        .catch(err => console.error(err));
}

document.getElementById("btn2").addEventListener("click", dogPhotosAxios); 