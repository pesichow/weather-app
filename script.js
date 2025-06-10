const apiKey = '1030e1f458ca892f675d171d2bd9dd1d';

async function getWeather() {
  const location = document.getElementById('locationInput').value;
  if (!location) return alert("Please enter a location");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();
  displayWeather(data);
  getForecast(location);
}

function displayWeather(data) {
  const resultDiv = document.getElementById('weatherResult');
  resultDiv.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p>Temperature: ${data.main.temp}°C</p>
    <p>Weather: ${data.weather[0].description}</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" />
  `;
}

async function getForecast(location) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();
  displayForecast(data);
}

function displayForecast(data) {
  const forecastDiv = document.getElementById('forecastResult');
  forecastDiv.innerHTML = `<h3>5-Day Forecast</h3>`;
  const filtered = data.list.filter((entry) => entry.dt_txt.includes("12:00:00"));
  filtered.forEach(item => {
    forecastDiv.innerHTML += `
      <p>${item.dt_txt.split(" ")[0]} - ${item.main.temp}°C - ${item.weather[0].description}
      <img src="http://openweathermap.org/img/wn/${item.weather[0].icon}.png" /></p>
    `;
  });
}

function getCurrentLocationWeather() {
  navigator.geolocation.getCurrentPosition(async position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    displayWeather(data);
    getForecastByCoords(lat, lon);
  });
}

async function getForecastByCoords(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();
  displayForecast(data);
}
