import getWeather from '../../api/weather-api';

const weatherCity = document.querySelector('.weather__input');

async function setWeather() {
  const weatherWrapper = document.querySelector('.weather__wrapper');
  const weatherIcon = document.querySelector('.weather__icon');
  const weatherTemp = document.querySelector('.weather__temp');
  const weatherFeel = document.querySelector('.weather__feel');
  const weatherDescr = document.querySelector('.weather__descr');
  const weatherWind = document.querySelector('.weather__wind');
  const weatherHumidity = document.querySelector('.weather__humidity');

  try {
    const weatherData = await getWeather(weatherCity.value);

    weatherIcon.className = 'weather__icon owf';
    weatherIcon.classList.add(`owf-${weatherData.weather[0].id}`);

    weatherTemp.textContent = `${Math.round(weatherData.main.temp)}°C`;
    weatherFeel.textContent = `Feels like ${Math.round(
      weatherData.main.feels_like
    )}°C`;
    weatherDescr.textContent = `${weatherData.weather[0].description[0].toUpperCase()}${weatherData.weather[0].description.slice(
      1
    )}`;
    weatherWind.textContent = `Wind speed: ${Math.round(
      weatherData.wind.speed
    )}m/s`;
    weatherHumidity.textContent = `Humidity: ${weatherData.main.humidity}%`;

    weatherCity.placeholder = '[Enter city]';
    weatherCity.classList.remove('js-weather-warn');
  } catch (err) {
    weatherWrapper.textContent = 'No weather data';
  }
}

document.addEventListener('DOMContentLoaded', setWeather);
weatherCity.addEventListener('change', () => {
  if (weatherCity.value) {
    setWeather();
    weatherCity.value = `${weatherCity.value[0].toUpperCase()}${weatherCity.value.slice(
      1
    )}`;
  } else {
    weatherCity.placeholder = 'City not found';
    weatherCity.classList.add('js-weather-warn');
  }
});
setInterval(setWeather, 600000);

const setUserCity = () => {
  const userCity = document.querySelector('.weather__input');

  window.addEventListener('beforeunload', () => {
    localStorage.setItem('city', userCity.value);
  });

  window.addEventListener('load', () => {
    if (localStorage.getItem('city')) {
      userCity.value = localStorage.getItem('city');
      setWeather();
    }
  });
};
setUserCity();
