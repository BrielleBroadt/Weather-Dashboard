// all variables
const apiKey = "d8353870936052dfa58ed91753ac2e4b"
var inputBox = document.querySelector("#msg")
var searchButton = document.querySelector("#button")
var mainWeather = document.querySelector("#main-weather-section")
var fiveDay = document.querySelector("#five-day-forecast")

// calling weather, using functions to return reponse of specified code for single day forecast
function searchWorks(cityName) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`
    ).then(function (response) {
        return response.json()
    }).then(function (weatherShit) {
        console.log(weatherShit)
        var weatherIcon = weatherShit.weather[0].icon
        var iconImageUrl = `https://openweathermap.org/img/wn/${weatherIcon}.png`
        var date = new Date(weatherShit.dt * 1000).toDateString();
        var todayForecast = `
    <h1> ${weatherShit.name} </h1>
    <p> Date: ${date} </p>
    <img src="${iconImageUrl}">
    <p>${weatherShit.weather[0].description}</p>
    <p>Temp: ${weatherShit.main.temp}</p>
    <p>Humidity:${weatherShit.main.humidity}</p>
    <p>Wind Speed: ${weatherShit.wind.speed}</p>
    
        `
        mainWeather.innerHTML = todayForecast
        var lat = weatherShit.coord.lat
        var lon = weatherShit.coord.lon
        fiveDayForecast(lat, lon)
    })
}

// calling weather, using functions to return reponse of specified code for five day forecast

function fiveDayForecast(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast/?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);

            for (var i = 1; i <= 33; i += 8) {
                console.log("Temp:",data.list[i].main.temp);
                console.log("Humidity:",data.list[i].main.humidity);
                console.log("Wind Speed:",data.list[i].wind.speed);
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

// 
searchButton.addEventListener("click", function (event) {
    event.preventDefault()
    var cityName = inputBox.value.trim()
    searchWorks(cityName)
})

