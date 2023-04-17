// ! Global Variables
const apiKey = '499f188a6ab6f2aa9d9a609dac8ea3f2';
var currentWeather = $('#current-weather');
var weatherForecast = $('#weather-forecast');
var cityArray; 

// Set Local Storage
if(localStorage.getItem("weatherSearches")){
    cityArray = JSON.parse(localStorage.getItem("weatherSearches"))
    setLocalStorage(cityArray);
} else {
    cityArray=[];
};

// !Functions
// Get current Weather /append into html/ look into lat long 
function getCurrentWeather(cityName) {
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`;

    $.get(queryURL).then((response) =>{
        var todaysDate = new Date(response.dt * 1000);
        console.log(response);
        console.log(todaysDate);
        var weatherIcon = `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`;
        // console.log(response.coord);
        // getUVIndex(response.coord);
        currentWeather.html(`<h3>${response.name}, ${response.sys.country} (${todaysDate.getMonth() + 1}/${todaysDate.getDate()}/${todaysDate.getFullYear()})<img src=${weatherIcon}></h2>
        <p>Temp: ${response.main.temp} F</p>
        <p>Humidity: ${response.main.humidity}%</p>
        <p>WindSpeed: ${response.wind.speed} m/s</p>`);
        getUVIndex(response.coord);
        createHistoryLog(response.name);
    })

};
// get UV index 
function getUVIndex(coord){
    var queryURL = `https://api.openweathermap.org/data/2.5/uvi?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}`;

    $.get(queryURL).then((response) =>{
        let uvIndex = response.value;
        console.log(uvIndex);
        currentWeather.append(`<p>UV Index: ${uvIndex}/11</p>`);
    })
};

// Get weather forecast /append into html/
function getWeatherForecast(cityName) {
    var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${apiKey}`;

    $.get(queryURL).then((response) =>{
        var forecastData = response.list;
        weatherForecast.empty();
            console.log(response);
        $.each(forecastData, (i) =>{
            if(!forecastData[i].dt_txt.includes('12:00:00')){
                return;
            }
            var forecastDate = new Date(forecastData[i].dt * 1000);
            var weatherIcon = `https://openweathermap.org/img/wn/${forecastData[i].weather[0].icon}.png`;
            weatherForecast.append(`
            <div class="col-m">
                <div class="card bg-primary">
                    <div class="card-body">
                        <h4>${forecastDate.getMonth() + 1}/${forecastDate.getDate()}/${forecastDate.getFullYear()}</h4>
                        <img src=${weatherIcon}>
                        <p>Temp: ${forecastData[i].main.temp} F</p>
                        <p>Humidity: ${forecastData[i].main.humidity}%</p>
                    </div>
                </div>
            </div>`)
        })
    })

};
// Get search history buttons /append into html/
function createHistoryLog(cityName){
    var searchedCity = cityName.trim();
    var evaluateButton = $(`#search-history > BUTTON[value=${searchedCity}]`);
    if(evaluateButton.length == 1){
        return;
    }

    if(!cityArray.includes(cityName)){
        cityArray.push(cityName);
        localStorage.setItem('weatherSearches', JSON.stringify(cityArray))
    }

    $("#search-history").prepend(`<button class="btn btn-dark historyBtn" value=${cityName}>${cityName}</button>`)
};

function setLocalStorage(array){
    $.each(array, (i) => {
createHistoryLog(array[i])
    })
};
// initial calls 
getCurrentWeather("Minneapolis");
getWeatherForecast("Minneapolis");
// EL Buttons
$('#city-search-button').click((e) => {
    e.preventDefault();
    var cityName = $('#city-input').val();
    getCurrentWeather(cityName);
    getWeatherForecast(cityName);
});

$('#search-history').click((e)=>{
    var cityName = e.target.value;
    getCurrentWeather(cityName);
    getWeatherForecast(cityName);
});

// notes: 
// - find codes for fahrenheit and percent signs 
// -date, icon, temp, humidity, wind speed(1day), UV index(1day)
                      

// {
//     "cod": "200",
//     "message": 0,
//     "cnt": 40,
//     "list": [
//       {
//         "dt": 1647345600,
//         "main": {
//           "temp": 287.39,
//           "feels_like": 286.38,
//           "temp_min": 286.69,
//           "temp_max": 287.39,
//           "pressure": 1021,
//           "sea_level": 1021,
//           "grnd_level": 1018,
//           "humidity": 58,
//           "temp_kf": 0.7
//         },
//         "weather": [
//           {
//             "id": 803,
//             "main": "Clouds",
//             "description": "broken clouds",
//             "icon": "04d"
//           }
//         ],
//         "clouds": {
//           "all": 71
//         },
//         "wind": {
//           "speed": 3.08,
//           "deg": 128,
//           "gust": 4.3
//         },
//         "visibility": 10000,
//         "pop": 0,
//         "sys": {
//           "pod": "d"
//         },
//         "dt_txt": "2022-03-15 12:00:00"
//       },
//       {
//         "dt": 1647356400,
//         "main": {
//           "temp": 287.09,
//           "feels_like": 286.13,
//           "temp_min": 286.5,
//           "temp_max": 287.09,
//           "pressure": 1021,
//           "sea_level": 1021,
//           "grnd_level": 1016,
//           "humidity": 61,
//           "temp_kf": 0.59
//         },
//         "weather": [
//           {
//             "id": 803,
//             "main": "Clouds",
//             "description": "broken clouds",
//             "icon": "04d"
//           }
//         ],
//         "clouds": {
//           "all": 81
//         },
//         "wind": {
//           "speed": 3.28,
//           "deg": 168,
//           "gust": 3.96
//         },
//         "visibility": 10000,
//         "pop": 0,
//         "sys": {
//           "pod": "d"
//         },
//         "dt_txt": "2022-03-15 15:00:00"
//       },
//       {
//         "dt": 1647367200,
//         "main": {
//           "temp": 285.44,
//           "feels_like": 284.6,
//           "temp_min": 284.47,
//           "temp_max": 285.44,
//           "pressure": 1020,
//           "sea_level": 1020,
//           "grnd_level": 1016,
//           "humidity": 72,
//           "temp_kf": 0.97
//         },
//         "weather": [
//           {
//             "id": 804,
//             "main": "Clouds",
//             "description": "overcast clouds",
//             "icon": "04d"
//           }
//         ],
//         "clouds": {
//           "all": 90
//         },
//         "wind": {
//           "speed": 2.7,
//           "deg": 183,
//           "gust": 5.59
//         },
//         "visibility": 10000,
//         "pop": 0,
//         "sys": {
//           "pod": "d"
//         },
//         "dt_txt": "2022-03-15 18:00:00"
//       },
//       .....
//           {
//         "dt": 1647766800,
//         "main": {
//           "temp": 282.42,
//           "feels_like": 280,
//           "temp_min": 282.42,
//           "temp_max": 282.42,
//           "pressure": 1036,
//           "sea_level": 1036,
//           "grnd_level": 1033,
//           "humidity": 60,
//           "temp_kf": 0
//         },
//         "weather": [
//           {
//             "id": 802,
//             "main": "Clouds",
//             "description": "scattered clouds",
//             "icon": "03d"
//           }
//         ],
//         "clouds": {
//           "all": 39
//         },
//         "wind": {
//           "speed": 4.58,
//           "deg": 83,
//           "gust": 8.45
//         },
//         "visibility": 10000,
//         "pop": 0,
//         "sys": {
//           "pod": "d"
//         },
//         "dt_txt": "2022-03-20 09:00:00"
//       }
//     ],
//     "city": {
//       "id": 2643743,
//       "name": "London",
//       "coord": {
//         "lat": 51.5085,
//         "lon": -0.1257
//       },
//       "country": "GB",
//       "population": 1000000,
//       "timezone": 0,
//       "sunrise": 1647324902,
//       "sunset": 1647367441
//     }
//   }
                          
  
                      