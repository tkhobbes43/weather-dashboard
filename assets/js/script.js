var fetchButton = document.getElementById('fetch-button');
var cityInput = document.getElementById('input-box');

var cityFormSubmit = function (event) {
    event.preventDefault();
    var city = cityInput.value;
    if (city) {
        currentWeather();
        cityInput.value = '';
    } else {
        alert('Please enter a real City name');
    }
};  

function currentWeather() {
    var city = cityInput.value;
    console.log(city);
    var queryURL= "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=d23b9ff5efa45588d81ffe68aaf47963";
    fetch(queryURL)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
}

fetchButton.addEventListener('click', currentWeather);
cityInput.addEventListener('click', cityFormSubmit);
