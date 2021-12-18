import getWeather from '../../api/weather-api';

export default class Weather {
  constructor() {
    this.weatherCity = document.querySelector('.weather__input');
    this.dataWrapper = document.querySelector('.weather__data');
    this.weatherIcon = document.querySelector('.weather__icon');
    this.weatherTemp = document.querySelector('.weather__temp');
    this.weatherFeel = document.querySelector('.weather__feel');
    this.weatherDescr = document.querySelector('.weather__descr');
    this.windSpeed = document.querySelector('.weather__wind-speed');
    this.windDirection = document.querySelector('.weather__wind-direction');
    this.weatherHumidity = document.querySelector('.weather__humidity');

    this.warnMessage = document.createElement('span');

    this.weatherCity.value = localStorage.getItem('vigitory-city') || 'Minsk';
  }

  async setWeather() {
    try {
      this.dataWrapper.classList.remove('js-show-elem');

      const weatherData = await getWeather(this.weatherCity.value);

      if (this.warnMessage) this.warnMessage.remove();
      if (weatherData.cod === 200) {
        this.weatherCity.value = `${this.weatherCity.value[0].toUpperCase()}${this.weatherCity.value.slice(
          1
        )}`;
        localStorage.setItem('vigitory-city', this.weatherCity.value);
      }

      this.dataWrapper.classList.add('js-show-elem');
      this.weatherIcon.className = 'weather__icon owf';
      this.weatherIcon.classList.add(`owf-${weatherData.weather[0].id}`);

      this.weatherTemp.textContent = `${Math.round(weatherData.main.temp)}°C`;
      this.weatherFeel.textContent = `Feels like ${Math.round(
        weatherData.main.feels_like
      )}°C`;
      this.weatherDescr.textContent = `${weatherData.weather[0].description[0].toUpperCase()}${weatherData.weather[0].description.slice(
        1
      )}`;
      this.windSpeed.textContent = `Wind: ${Math.round(
        weatherData.wind.speed
      )}m/s,`;
      this.weatherHumidity.textContent = `Humidity: ${weatherData.main.humidity}%`;

      this.windDirection.style.transform = `rotate(${
        weatherData.wind.deg - 180
      }deg)`;
      this.windDirection.style.backgroundImage =
        'url("../assets/svg/wind-arrow.svg")';
    } catch (err) {
      this.weatherCity.value = '';

      this.weatherIcon.textContent = '';
      this.weatherTemp.textContent = '';
      this.weatherFeel.textContent = '';
      this.weatherDescr.textContent = '';
      this.windSpeed.textContent = '';
      this.windDirection.style.backgroundImage = 'none';
      this.weatherHumidity.textContent = '';

      this.warnMessage.classList.add('js-show-elem');
      this.warnMessage.classList.add('js-weather-warn');
      this.warnMessage.textContent = 'No weather data';
      this.weatherCity.insertAdjacentElement('afterend', this.warnMessage);
    }
  }

  addListeners() {
    this.weatherCity.addEventListener('keyup', (event) => {
      if (event.code === 'Enter' && this.weatherCity.value !== '') {
        this.setWeather();
      }
    });
  }

  init() {
    this.setWeather();
    this.addListeners();

    setInterval(() => this.setWeather(), 600000);
  }
}
