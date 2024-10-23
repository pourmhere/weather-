const btn = document.getElementById("call-api");
const oldpage = document.getElementById("old-page");
const overlay = document.getElementById("overlay");
const result = document.getElementById("result");
btn.addEventListener("click", getLocation);
//
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  oldpage.remove();

  const lat = position.coords.latitude;
  const long = position.coords.longitude;
  const apiKey = "29ea59008d3de05217a39030c2557701"; // Use your API key here
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;

  async function getData() {
    // overlay.style.display = "block"; // Show loader and dim background

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      //   overlay.style.display = "none";
      console.log(data);
      if (response.ok) {
        let weather = {
          location: data.name,
          windSpeed: data.wind.speed,
          humidity: data.main.humidity,
          pressure: data.main.pressure,
          windDirection: data.wind.deg,
          uvIndex: "5",
          feelsLike: data.main.feels_like,
          timezone: data.timezone,
        };
        displayMap(lat, long);
        // createLoading2(lat, long, weather);
      } else {
        console.error("Error fetching weather data:", data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Failed to fetch weather data.");
    }
  }

  getData();
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
  }
}

function displayMap(latitude, longitude) {
  const mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&output=embed`;
  const iframe = document.createElement("iframe");
  iframe.setAttribute("src", mapUrl);
  iframe.setAttribute("width", "95%");
  iframe.setAttribute("height", "500");
  iframe.setAttribute("frameborder", "0");
  iframe.setAttribute("style", "border:0");
  iframe.setAttribute("style", "margin:auto");

  document.body.appendChild(iframe);
}

function createLoading2(latValue, longValue, weather) {
  let secondLanding = document.createElement("div");
  secondLanding.className = "second-landing-page";
  let innerSide = document.createElement("div");
  innerSide.innerHTML = `
    
              <div class="main-page">
                  <div class="weather-map">
                      <h2>Welcome To The Weather App</h2>
                      <p>${weather.location} is your current location</p>    
                      <div class="box">
                          <div class="map-box">Lat: ${latValue}</div>
                          <div class="map-box">Long: ${longValue}</div>
                      </div>
                  </div>
                  <div id="map" class="map">
                      <iframe src="https://maps.google.com/maps?q=${latValue},${longValue}&z=15&output=embed"></iframe>
                  </div>
              </div>
          <section class="weather-data">
                  <h2>Your Weather Data</h2>
                  <div class="weather-data-box">
                       <div class="map-box">Location: ${weather.location || "N/A"}</div>
                      <div class="map-box">Wind Speed: ${weather.windSpeed || "N/A"} kmph</div>
                      <div class="map-box">Humidity: ${weather.humidity || "N/A"}</div>
                      <div class="map-box">Time Zone: GMT ${weather.timezone ? weather.timezone / 3600 : "N/A"}</div>
                      <div class="map-box">Pressure: ${weather.pressure || "N/A"}atm</div>
                      <div class="map-box">Wind Direction: ${weather.windDirection || "N/A"}°</div>
                      <div class="map-box">UV Index: ${weather.uvIndex}</div>
                      <div class="map-box">Feels like: ${weather.feelsLike || "N/A"}°</div>
                  </div>
          </section>
      `;
  secondLanding.appendChild(innerSide);
  document.body.appendChild(secondLanding);
}

//
class WeatherData {
  constructor(jsonData) {
    this._temperature = jsonData.main.temp;
    this._feelsLike = jsonData.main.feels_like;
    this._tempMin = jsonData.main.temp_min;
    this._tempMax = jsonData.main.temp_max;
    this._pressure = jsonData.main.pressure;
    this._humidity = jsonData.main.humidity;
    this._description = jsonData.weather[0].description;
    this._icon = jsonData.weather[0].icon;
    this._windSpeed = jsonData.wind.speed;
    this._windDirection = jsonData.wind.deg;
    this._cityName = jsonData.name;
    this._latitude = jsonData.coord.lat;
    this._longitude = jsonData.coord.lon;
  }

  get temperature() {
    return this._temperature;
  }
  get feelsLike() {
    return this._feelsLike;
  }
  get tempMin() {
    return this._tempMin;
  }
  get tempMax() {
    return this._tempMax;
  }
  get pressure() {
    return this._pressure;
  }
  get humidity() {
    return this._humidity;
  }
  get description() {
    return this._description;
  }
  get icon() {
    return this._icon;
  }
  get windSpeed() {
    return this._windSpeed;
  }
  get windDirection() {
    return this._windDirection;
  }
  get cityName() {
    return this._cityName;
  }
  get latitude() {
    return this._latitude;
  }
  get longitude() {
    return this._longitude;
  }

  display() {
    console.log(`Location: ${this.cityName}`);
    console.log(`Temperature: ${this.temperature}°C (Feels like: ${this.feelsLike}°C)`);
    console.log(`Min Temp: ${this.tempMin}°C, Max Temp: ${this.tempMax}°C`);
    console.log(`Weather: ${this.description}`);
    console.log(`Humidity: ${this.humidity}%`);
    console.log(`Wind: ${this.windSpeed} m/s, Direction: ${this.windDirection}°`);
    console.log(`Coordinates: (${this.latitude}, ${this.longitude})`);
  }
}

class Weather {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.apiUrl = "https://api.openweathermap.org/data/2.5/weather";
  }

  async getWeather(lat, lon) {
    const url = `${this.apiUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const jsonData = await response.json();
      const weatherData = new WeatherData(jsonData);
      weatherData.display();
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

const apiKey = "29ea59008d3de05217a39030c2557701"; // Your API key here
const weatherApp = new Weather(apiKey);
const lat = 37.7749; // Latitude for San Francisco
const lon = -122.4194; // Longitude for San Francisco
// weatherApp.getWeather(lat, lon);
