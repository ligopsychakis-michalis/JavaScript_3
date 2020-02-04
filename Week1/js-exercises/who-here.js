//API call with XMLHttpRequest
function newFriendXhr(){
    let xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://www.randomuser.me/api', true);

    xhr.send();

    xhr.addEventListener("load", () => {
        if (xhr.status === 200){
            res = JSON.parse(xhr.response);
            console.log((res.results));
        }else{console.log("Error on request...")}
    })

    xhr.addEventListener("error", () => console.log("Error on request..."));
}

newFriendXhr();


//API call with Axios
function newFriendAxios(){
    axios
        .get('https://www.randomuser.me/api')
        .then(res => console.log(res.data.results))
        .catch(err => console.log(err));
}

newFriendAxios();