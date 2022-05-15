// var fetchButton = document.getElementById('fetch-button');
// var cityInput = document.getElementById('input-box');

var apiKey = "d23b9ff5efa45588d81ffe68aaf47963";
var today = moment().format('L');
var searchCityHistory = [];
// how to search for weather by the city
var cityFormSubmit = function (event) {
    event.preventDefault();
    // var city = cityInput.value;
    // if (city) {
    //     currentWeather();
    //     cityInput.value = '';
    // }
    // localStorage.setItem('input-box', city)
    // $(document).on("click", function(event) {

    // });
};  

// fetching API from server
function currentWeather(city) {
    // var city = cityInput.value;
    // console.log(city);
    var queryURL= `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    // fetch(queryURL)
    //     .then(response => response.json())
    //     .then(data =>{
    //         console.log(data)
    //         forecastWeather(data)
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(cityWeatherResponse) { 
        console.log(cityWeatherResponse);

        $("#weather-box").css("display", "block");
        $("#displayCurrentWeather").empty();

        var iconCode = cityWeatherResponse.weather[0].icon;
        var iconURL = `https://operweathermap.org/img/wn/${iconCode}.png`;

        var searchedCity = $(`
            <h2 id="currentCity">
                ${cityWeatherResponse.name} ${today} <img src="${iconURL}" alt="${cityWeatherResponse.weather[0].description}" />
            </h2>
            <p>Temperature: ${cityWeatherResponse.main.temp} °F</p>
            <p>Humidity: ${cityWeatherResponse.main.humidity}\%</p>
            <p>Wind Speed: ${cityWeatherResponse.wind.speed} MPH</p>                        
        `);

        $("#displayCurrentWeather").append(searchedCity);
        // var temp = document.querySelector(".temp");
        // temp.textContent = data.main.feels_like;
        // var wind = document.querySelector(".wind");
        // wind.textContent = data.wind.speed;
        // var humidity = document.querySelector(".humidity");
        // humidity.textContent = data.main.humidity; 
    
    });
}

// function forecastWeather(obj) {
//     var oneCallUri ="https://api.openweathermap.org/data/2.5/onecall?lat=" + obj.coord.lat + "&lon=" + obj.coord.lon + "&appid=d23b9ff5efa45588d81ffe68aaf47963&units=imperial"
//     fetch(oneCallUri)
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//             var uvIndex = document.querySelector(".uvindex");
//             uvIndex.textContent = data.current.uvi;
//         })
// }

$("#search-button").on("click", function(event){
    event.preventDefault();

    var city = $("#input-box").val().trim();
    currentWeather(city);
    if (!searchCityHistory.includes(city)) {
        searchCityHistory.push(city);
        var cityInput = $(`
            <li class="list-group-item">${city}</li>
            `);
        $("#searchhistory").append(cityInput);
    };
});
// fetchButton.addEventListener('click', currentWeather);
// cityInput.addEventListener('click', cityFormSubmit);
