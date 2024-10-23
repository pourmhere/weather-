// Wait for the button click to trigger geolocation and data fetching
document.getElementById("fetchDataBtn").addEventListener("click", getLocation);

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  // Display Google Map with the user's location
  initMap(lat, lon);

  // Fetch the weather data from OpenWeatherMap API
  fetchWeatherData(lat, lon);
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
  }
}

// Initialize Google Map at the user's location
function initMap(lat, lon) {
  const mapOptions = {
    center: new google.maps.LatLng(lat, lon),
    zoom: 12,
  };

  const map = new google.maps.Map(document.getElementById("map"), mapOptions);
  const marker = new google.maps.Marker({
    position: new google.maps.LatLng(lat, lon),
    map: map,
  });
}

// Fetch weather data from OpenWeatherMap API
function fetchWeatherData(lat, lon) {
  const apiKey = "";
  //   const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=metric&appid=${apiKey}`;
  const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => displayWeatherData(data))
    .catch((error) => console.log(error));
}

// Display weather data in the UI
function displayWeatherData(data) {
  const weatherElement = document.getElementById("weatherData");

  const htmlContent = `
        <h3>Current Weather</h3>
        <p>Temperature: ${data.current.temp}°C</p>
        <p>Feels like: ${data.current.feels_like}°C</p>
        <p>Humidity: ${data.current.humidity}%</p>
        <p>Wind Speed: ${data.current.wind_speed} km/h</p>
        <p>Pressure: ${data.current.pressure} hPa</p>
        <p>UV Index: ${data.current.uvi}</p>
        <p>Weather: ${data.current.weather[0].description}</p>
    `;

  weatherElement.innerHTML = htmlContent;
}
