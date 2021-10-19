const weatherCity = document.querySelector('.weather__input');

async function getWeather() {
  const weatherIcon = document.querySelector('.weather__icon');
  const weatherTemp = document.querySelector('.weather__temp');
  const weatherWind = document.querySelector('.weather__wind');
  const weatherHumidity = document.querySelector('.weather__humidity');

  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${weatherCity.value}&lang=en&appid=a8122fbe52b443584fbcba6f23095ca1&units=metric`;

  const weatherRes = await fetch(weatherUrl);
  const weatherData = await weatherRes.json();

  weatherIcon.className = 'weather__icon owf';
  weatherIcon.classList.add(`owf-${weatherData.weather[0].id}`);

  weatherTemp.textContent = `${weatherData.main.temp.toFixed(0)}°C ${weatherData.weather[0].description}`;
  weatherWind.textContent = `Wind speed: ${weatherData.wind.speed.toFixed(0)}m/s`;
  weatherHumidity.textContent = `Humidity: ${weatherData.main.humidity}%`;
}

document.addEventListener('DOMContentLoaded', getWeather);
weatherCity.addEventListener('input', getWeather);
setInterval(getWeather, 600000);
