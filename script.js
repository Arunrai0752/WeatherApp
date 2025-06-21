const API_KEY = "-";

async function getWeather() {
    const city = document.getElementById("city").value.trim();

    try {
        const { lat, lon } = await getGeoLoc(city);

        if (!lat || !lon) {
            alert("Invalid City Name: " + city);
            document.getElementById("city").value = "";
            return;
        }

        const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
        const response = await fetch(URL);
        const data = await response.json();

        document.getElementById("temp").innerText = (data.main.temp - 273.14).toFixed(2);
        document.getElementById("windSpeed").innerText = data.wind.speed + " m/s";
        document.getElementById("icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    } catch (error) {
        console.log("An Error Occurred", error);
    }
}

async function getGeoLoc(city) {
    try {
        const URL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;
        const response = await fetch(URL);
        const data = await response.json();

        const lat = data[0].lat;
        const lon = data[0].lon;

        console.log(lat,lon);
        
        return { lat, lon };
    } catch (error) {
        console.log(error);
        return {};
    }
}


// function outer() {
//   let count = 0; 
//   return function inner() {
//     count++;     
//     return count;
//   };
// }

// const counter = outer(); 

// console.log(counter()); 
// console.log(counter()); 
// console.log(counter()); 
// console.log(counter()); 
// console.log(counter()); 
