const openWeatherMapApiKey = '4f785cddcbb60d07fe0ba9e8c18c3a97';
const openWeatherMapApiUrl = 'http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=';
const userLocationApiUrl = 'http://ip-api.com/json';



getUserLocation();

function getUserLocation() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState == XMLHttpRequest.DONE && request.status == 200) {
            var userLocation = JSON.parse(request.responseText);
            var weatherUrl = openWeatherMapApiUrl + openWeatherMapApiKey;
            weatherUrl = weatherUrl.replace(/{lat}/, userLocation.lat);
            weatherUrl = weatherUrl.replace(/{lon}/, userLocation.lon);
            getWeatherByCoordinates(weatherUrl)
        }

    };
    request.open('GET', userLocationApiUrl, true);
    request.send()
}

function getWeatherByCoordinates(weatherUrl) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState == XMLHttpRequest.DONE && request.status == 200) {
            var currentTempInCelsius = (Number(JSON.parse(request.responseText).main.temp) - 273.15).toFixed(2);
            document.getElementById('weather-data').innerHTML = String(currentTempInCelsius);
        }

    };
    request.open('GET', weatherUrl, true);
    request.send()
}

function updateWeather(responseText) {
    document.getElementById('weather-data').innerHTML = responseText;
}