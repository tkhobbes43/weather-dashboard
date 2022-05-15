var apiKey = "d23b9ff5efa45588d81ffe68aaf47963";
var today = moment().format('L');
var searchCityHistory = [];

// using ajax to get API from server
function currentWeather(city) {

    var queryURL= `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(cityWeatherResponse) { 
        console.log(cityWeatherResponse);

        $("#weather-box").css("display", "block");
        $("#displayCurrentWeather").empty();

        let iconCode = cityWeatherResponse.weather[0].icon;
        let iconURL = `https://openweathermap.org/img/wn/${iconCode}.png`;

        let searchedCity = $(`
            <h2 id="currentCity">
                ${cityWeatherResponse.name} ${today} <img src="${iconURL}" alt="${cityWeatherResponse.weather[0].description}" />
            </h2>
            <p>Temperature: ${cityWeatherResponse.main.temp} °F</p>
            <p>Humidity: ${cityWeatherResponse.main.humidity}\%</p>
            <p>Wind Speed: ${cityWeatherResponse.wind.speed} MPH</p>                        
        `);

        $("#displayCurrentWeather").append(searchedCity);
    // start of second api request for 5 day forecast and UVIndex
        let lat = cityWeatherResponse.coord.lat;
        let lon = cityWeatherResponse.coord.lon;
        let uviQueryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        $.ajax({
            url: uviQueryURL,
            method: "GET"
        }).then(function(uviResponse){
            console.log(uviResponse);

            let uvIndex = uviResponse.current.uvi;
            let uvIndexPEl = $(`
                <p>UV Index:
                    <span id="uvIndexColor" class="px-2 py-2 rounded">${uvIndex}</span>
                <p>
            `);

            $("#displayCurrentWeather").append(uvIndexPEl);

            // fiveDayForecast(lat, lon);

            if (uvIndex >= 0 && uvIndex <= 2) {
                $("#uvIndexColor").css("background-color", "#3EA72D").css("color", "white");
            } else if (uvIndex >= 3 && uvIndex <= 5) {
                $("#uvIndexColor").css("background-color", "#FFF300");
            } else if (uvIndex >= 6 && uvIndex <= 7) {
                $("#uvIndexColor").css("background-color", "#F18B00");
            } else if (uvIndex >= 8 && uvIndex <= 10) {
                $("#uvIndexColor").css("background-color", "#E53210").css("color", "white");
            } else {
                $("#uvIndexColor").css("background-color", "#B567A4").css("color", "white"); 
            };  
        })

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
