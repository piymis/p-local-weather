const weatherMapApiUrl = 'https://api.apixu.com/v1/current.json?key=ab4c157f6f6644d182e205155172706&q={lat},{lon}';
const userLocationApiUrl = 'https://freegeoip.net/json/';
var isCelsius = true;
var weatherData;
var userLocation;

// Update weather on page load
document.addEventListener("DOMContentLoaded", updateWeatherOnLoad, false);
document.getElementById('weather-unit').addEventListener('click', changeWeatherUnit, false);


function updateWeatherOnLoad() {
    getLocationAndWeather();
}


function changeWeatherUnit() {
    isCelsius = !isCelsius;
    updateWeather();
}

// Get user loaction and request for weather data based on location
function getLocationAndWeather() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState == XMLHttpRequest.DONE && request.status == 200) {
            userLocation = JSON.parse(request.responseText);
            var weatherUrl = weatherMapApiUrl;
            weatherUrl = weatherUrl.replace(/{lat}/, userLocation.latitude);
            weatherUrl = weatherUrl.replace(/{lon}/, userLocation.longitude);
            getWeatherByCoordinates(weatherUrl);
        }

    };
    request.open('GET', userLocationApiUrl, true);
    request.send()
}

// Get weather data for location
function getWeatherByCoordinates(weatherUrl) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState == XMLHttpRequest.DONE && request.status == 200) {
            weatherData = JSON.parse(request.responseText);
            updateWeather();
        }

    };
    request.open('GET', weatherUrl, true);
    request.send()
}

function updateWeather() {
    var currentTemperature, temperatureUnit;
    if (isCelsius) {
        currentTemperature = Number(weatherData.current.temp_c).toFixed(2);
        temperatureUnit = 'C';
    } else {
        currentTemperature = Number(weatherData.current.temp_f).toFixed(2);
        temperatureUnit = 'F';
    }
    
    // Current temperature
    weatherValueElement = document.getElementById('weather-value')
    weatherValueElement.innerHTML = String(currentTemperature);
    
    // 
    var weatherUnitData = String.fromCharCode(176) + temperatureUnit;
    document.getElementById('weather-unit').innerHTML = weatherUnitData;
    
    var imgDataElement = document.getElementById('weather-image');
    imgDataElement.setAttribute('src', 'http:' + weatherData.current.condition.icon);
}

