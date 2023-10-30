// all variables
const apiKey = "d8353870936052dfa58ed91753ac2e4b";
var inputBox = document.querySelector("#msg");
var searchButton = document.querySelector("#button");
var mainWeather = document.querySelector("#main-weather-section");
var fiveDay = document.querySelector("#five-day-forecast");
var historyList = document.querySelector("#history-list")

// calling weather, using functions to return reponse of specified code for single day forecast
function searchWorks(cityName) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (weatherShit) {
      console.log(weatherShit);
      var weatherIcon = weatherShit.weather[0].icon;
      var iconImageUrl = `https://openweathermap.org/img/wn/${weatherIcon}.png`;
      var date = new Date(weatherShit.dt * 1000).toDateString();
      var todayForecast = `
    <h1> ${weatherShit.name} </h1>
    <p> Date: ${date} </p>
    <img src="${iconImageUrl}">
    <p>${weatherShit.weather[0].description}</p>
    <p>Temp: ${weatherShit.main.temp}</p>
    <p>Humidity:${weatherShit.main.humidity}</p>
    <p>Wind Speed: ${weatherShit.wind.speed}</p>
    
        `;
      mainWeather.innerHTML = todayForecast;
      var lat = weatherShit.coord.lat;
      var lon = weatherShit.coord.lon;
      fiveDayForecast(lat, lon);
    });
}

// calling weather, using functions to return reponse of specified code for five day forecast

function fiveDayForecast(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast/?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log(data.list);
      let weekDayLoop= data.list.filter(day => day.dt_txt.includes("12:00:00"))
      let fiveDayForecast = "";
      for (var i = 0; i < weekDayLoop.length; i++) {
        const time= weekDayLoop[i].dt * 1000
        const currentDates= new Date(time).toLocaleDateString()
        const iconThing= weekDayLoop[i].weather[0].icon
        const weatherIcon=`<img src="http://openweathermap.org/img/wn/${iconThing}.png"/>`
        console.log(weekDayLoop);
        console.log("Temp:", weekDayLoop[i].main.temp);
        console.log("Humidity:", weekDayLoop[i].main.humidity);
        console.log("Wind Speed:", weekDayLoop[i].wind.speed);
        fiveDayForecast += `
                <div class = "weatherCard">
                <h4> ${currentDates} </h4>
                <div>${weatherIcon}</div>
                <p>Temp: ${weekDayLoop[i].main.temp}</p>
    <p>Humidity:${weekDayLoop[i].main.humidity}</p>
    <p>Wind Speed: ${weekDayLoop[i].wind.speed}</p>
    </div>    
                
                `;
        fiveDay.innerHTML = fiveDayForecast;
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function saveCities(){
    var inputSearch = inputBox.value.trim();
    var cityHistory = JSON.parse (localStorage.getItem("cityHistory")) ||[]
    cityHistory.push(inputSearch)
    localStorage.setItem ("cityHistory",JSON.stringify(cityHistory))
    makeHistoryButton(cityHistory)
}
function makeHistoryButton(cityHistory) {
  console.log("click")
    var loopThroughMyShit = JSON.parse (localStorage.getItem("cityHistory")) ||[]
    // historyList.innerHTML = ""
    for ( var i=0; i<loopThroughMyShit.length; i++){
        console.log(cityHistory)
        const historyButton = document.createElement("button")
        console.log("historyButton")
        historyButton.textContent = loopThroughMyShit[i]
        historyButton.className += "historyButton"
        historyList.appendChild(historyButton)
        
        historyButton.addEventListener("click", function(event){
            event.preventDefault();
            var pastSearch = historyButton.textContent
            searchWorks(pastSearch)
        })
        }
    }
//
searchButton.addEventListener("click", function (event) {
  event.preventDefault();
  var cityName = inputBox.value.trim();
  saveCities()
  searchWorks(cityName);
  inputBox.value = ""
});
