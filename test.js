const openWeatherMapApiUrl = 'https://api.apixu.com/v1/current.json?key=ab4c157f6f6644d182e205155172706&q={lat},{lon}';
const userLocationApiUrl = 'https://freegeoip.net/json/';



getUserLocation();

function getUserLocation() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState == XMLHttpRequest.DONE && request.status == 200) {
            var userLocation = JSON.parse(request.responseText);
            var weatherUrl = openWeatherMapApiUrl;
            weatherUrl = weatherUrl.replace(/{lat}/, userLocation.latitude);
            weatherUrl = weatherUrl.replace(/{lon}/, userLocation.longitude);
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
            var currentTempInCelsius = (Number(JSON.parse(request.responseText).current.temp_c)).toFixed(2);
            document.getElementById('weather-data').innerHTML = String(currentTempInCelsius);
        }

    };
    request.open('GET', weatherUrl, true);
    request.send()
}

function updateWeather(responseText) {
    document.getElementById('weather-data').innerHTML = responseText;
}