//initialize some variables
const timezone = document.querySelector(".timezone-icon h1");
const skycon = document.querySelector(".timezone-icon canvas");
const temp = document.querySelector(".temp");
const desc = document.querySelector(".desc");
const loader = document.querySelector(".loader");


//catch the current position
if (navigator.geolocation){ 
    navigator.geolocation.getCurrentPosition(position => {
      
    //make an API call to get the weather data, based on the current position    
    fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/a6495b1412e84a86bd9367f6bfb8ef66/${position.coords.latitude},${position.coords.longitude}`)
        .then(resp => resp.json())
        .then(data => {
            //vanish the loader first
            loader.style.display = "none";

            //manipulate the DOM to show the data from the API call
            const icon = new Skycons({"color":"white"});
            icon.add(skycon, data.daily.icon.toUpperCase().replace(/-/g, "_"));  //transform the data to much with skycons.js
            icon.play();

            timezone.innerText = data.timezone;
            desc.innerText = data.daily.summary;
            temp.innerText = `${data.currently.temperature} F`;

            //Event: when click on the temperature change from 'F' to 'C' and vise versa
            temp.addEventListener("click", () => {
                if (temp.innerText.includes("F")) {
                    temp.innerText = `${((data.currently.temperature - 32) / 1.8).toFixed(2)} C`
                }
                else { 
                    temp.innerText = `${data.currently.temperature} F`;
                }
            });
        })
        .catch(err => console.error(err));
    });
};

