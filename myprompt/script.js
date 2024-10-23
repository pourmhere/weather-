document.getElementById("fetchDataBtn").addEventListener("click", getWeatherData);

function getWeatherData() {
  // Get the location (latitude and longitude) using browser's geolocation API
  navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;

    // Update the latitude and longitude in the UI
    document.getElementById("latitude").textContent = lat;
    document.getElementById("longitude").textContent = long;

    // Call a weather API (OpenWeatherMap API example)
    const apiKey = ""; // Use your API key here
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    console.log(data);

    // Display the weather data
    document.getElementById("location").textContent = data.name;
    // document.getElementById("windSpeed").textContent = data.wind.speed + " km/h";
    document.getElementById("humidity").textContent = data.main.humidity + "%";
    document.getElementById("timeZone").textContent = data.timezone;
    document.getElementById("pressure").textContent = data.main.pressure + " hPa";
    document.getElementById("windDirection").textContent = data.wind.deg + "°";
    document.getElementById("uvIndex").textContent = "500"; // Example UV Index, you can use another API for this
    document.getElementById("feelsLike").textContent = data.main.feels_like + "°C";

    // Display the map (Using Leaflet for map rendering)
    var map = L.map("map").setView([lat, long], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "Map data &copy; OpenStreetMap contributors",
    }).addTo(map);

    L.marker([lat, long]).addTo(map).bindPopup(data.name).openPopup();
  });
}
