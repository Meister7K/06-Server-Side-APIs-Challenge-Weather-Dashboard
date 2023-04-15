// ! Global Variables
const apiKey = '9e15a536f961ad507e941b3cbd627793';
var currentWeather = $('#current-weather');
var weatherForecast =$('#weather-forecast');
var cityArray; 

// Set Local Storage
if(localStorage.getItem("weatherSearches")){
    cityArray = JSON.parse(localStorage.getItem("weatherSearches"))
} else {
    cityArray=[];
};

// !Functions
// Get current Weather /append into html/ 
function getCurrentWeather(cityName) {
    var queryURL = `api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`;
    
}


// Get weather forecast /append into html/

// Get search history buttons /append into html/

// initial calls 

// EL Buttons
$('#city-search-button').click((e) => {
    e.preventDefault();
    var cityName = $('#city-input').val();
    // call current weather (cityName)
    // call weather forecast (cityName)
})


// notes: 
// - find codes for fahrenheit and percent signs 
// -date, icon, temp, humidity, wind speed(1day), UV index(1day)