var fetchButton = document.getElementById('fetch-button');
var cityInput = document.getElementById('input-box');

// how to search for weather by the city
var cityFormSubmit = function (event) {
    event.preventDefault();
    var city = cityInput.value;
    if (city) {
        currentWeather();
        cityInput.value = '';
    }
};  

// fetching API from server
function currentWeather() {
    var city = cityInput.value;
    console.log(city);
    var queryURL= "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=d23b9ff5efa45588d81ffe68aaf47963";
    fetch(queryURL)
        .then(response => response.json())
        .then(data =>{
            console.log(data)
            forecastWeather(data)
            var temp = document.querySelector(".temp");
            temp.textContent = data.main.feels_like;
            var wind = document.querySelector(".wind");
            wind.textContent = data.wind.speed;
            var humidity = document.querySelector(".humidity");
            humidity.textContent = data.main.humidity; 
        });
}

function forecastWeather(obj) {
    var oneCallUri ="https://api.openweathermap.org/data/2.5/onecall?lat=" + obj.coord.lat + "&lon=" + obj.coord.lon + "&appid=d23b9ff5efa45588d81ffe68aaf47963&units=imperial"
    fetch(oneCallUri)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            var uvIndex = document.querySelector(".uvindex");
            uvIndex.textContent = data.current.uvi;
        })
}

fetchButton.addEventListener('click', currentWeather);
cityInput.addEventListener('click', cityFormSubmit);
