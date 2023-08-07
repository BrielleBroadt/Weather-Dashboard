// const apiKey ="d8353870936052dfa58ed91753ac2e4b" 
const apiKey ="df3fb9934a7d8ebae97c6749b588071a"
var inputBox = document.querySelector("#msg")
var searchButton = document.querySelector("#button")
var mainWeather = document.querySelector ("#main-weather-section")
var fiveDay = document.querySelector ("#five-day-forecast")

function searchWorks(cityName) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`
    ).then(function(response){
        return response.json()
    }).then(function(weatherShit) {
        console.log(weatherShit)
        var weatherIcon = weatherShit.weather[0].icon
        var iconImageUrl = `https://openweathermap.org/img/wn/${weatherIcon}.png`
        var todayForecast = `
    <h1> ${weatherShit.name} </h1>
    <img src="${iconImageUrl}">
    <p>${weatherShit.weather[0].description}</p>
    <p>Temp: ${weatherShit.main.temp}</p>
    <p>Humidity:${weatherShit.main.humidity}</p>
    <p>Wind Speed: ${weatherShit.wind.speed}</p>
        `
        mainWeather.innerHTML = todayForecast

    })

}

searchButton.addEventListener("click", function(event){
    event.preventDefault()
    var cityName = inputBox.value.trim()
    searchWorks(cityName)
})
