import getWeather from '../../api/weather-api';

export default class Weather {
  constructor() {
    this.weatherCity = document.querySelector('.weather__input');
    this.dataWrapper = document.querySelector('.weather__data');
    this.weatherIcon = document.querySelector('.weather__icon');
    this.weatherTemp = document.querySelector('.weather__temp');
    this.weatherFeel = document.querySelector('.weather__feel');
    this.weatherDescr = document.querySelector('.weather__descr');
    this.weatherWind = document.querySelector('.weather__wind');
    this.weatherHumidity = document.querySelector('.weather__humidity');

    this.warnMessage = document.createElement('span');
  }

  async setWeather() {
    try {
      this.dataWrapper.classList.remove('js-show-elem');

      if (this.warnMessage) this.warnMessage.remove();
      if (this.weatherCity.value === '') {
        this.weatherCity.value =
          localStorage.getItem('vigitory-city') || 'Minsk';
      }

      const weatherData = await getWeather(this.weatherCity.value);

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
      this.weatherWind.textContent = `Wind speed: ${Math.round(
        weatherData.wind.speed
      )}m/s`;
      this.weatherHumidity.textContent = `Humidity: ${weatherData.main.humidity}%`;
    } catch (err) {
      this.warnMessage.classList.add('js-show-elem');
      this.warnMessage.textContent = 'No weather data';
      this.warnMessage.classList.add('js-weather-warn');
      this.weatherCity.insertAdjacentElement('afterend', this.warnMessage);

      this.weatherCity.value = '';

      this.weatherIcon.textContent = '';
      this.weatherTemp.textContent = '';
      this.weatherFeel.textContent = '';
      this.weatherDescr.textContent = '';
      this.weatherWind.textContent = '';
      this.weatherHumidity.textContent = '';
    }
  }

  addListeners() {
    this.weatherCity.addEventListener('keyup', (event) => {
      if (event.code === 'Enter' && this.weatherCity.value !== '') {
        this.setWeather();
        this.weatherCity.value = `${this.weatherCity.value[0].toUpperCase()}${this.weatherCity.value.slice(
          1
        )}`;
      }
    });

    window.addEventListener('beforeunload', () => {
      localStorage.setItem('vigitory-city', this.weatherCity.value);
    });

    document.addEventListener('DOMContentLoaded', () => {
      if (localStorage.getItem('vigitory-city')) {
        this.weatherCity.value = localStorage.getItem('vigitory-city');
      } else {
        this.weatherCity.value = 'Minsk';
      }

      this.setWeather();
    });
  }

  init() {
    this.addListeners();

    setInterval(() => this.setWeather(), 600000);
  }
}
