import getWeather from '../../api/weather-api';
import windDirections from '../../data/wind-directions';
import countryNames from '../../data/country-names';

export default class Weather {
  constructor() {
    this.container = document.createElement('section');
    this.container.classList.add('section', 'weather');
    this.container.id = 'section-weather';

    this.warnMessage = document.createElement('span');
  }

  render() {
    this.container.innerHTML = `
      <h2 class="visually-hidden">Weather</h2>
      <div class="weather__wrapper">
        <div class="weather__top">
          <input class="weather__input" type="text" placeholder="[Enter city]" value="${
            localStorage.getItem('vigitory-city') || 'Minsk'
          }" aria-label="user-city">
          <p class="weather__city-time"></p>
        </div>
        <div class="weather__country-wrapper">
          <span class="weather__line"></span>
          <p class="weather__country"></p>
          <span class="weather__line"></span>
        </div>
      </div>
      <div class="weather__data">
        <p class="weather__temp-wrapper">
          <span class="weather__icon"></span>
          <span class="weather__temp"></span>
          <span class="weather__feel"></span>
        </p>
        <p class="weather__text weather__descr"></p>
        <p class="weather__text weather__wind">
          <span class="weather__wind-speed"></span>
          <span class="weather__wind-arrow"></span>
          <span class="weather__wind-descr"></span>
        </p>
        <p class="weather__text weather__humidity"></p>
      </div>
    `;

    return this.container;
  }

  getElements() {
    this.weatherCountry = this.container.querySelector('.weather__country');
    this.weatherLines = this.container.querySelectorAll('.weather__line');
    this.dataWrapper = this.container.querySelector('.weather__data');
    this.weatherCity = this.container.querySelector('.weather__input');
    this.weatherIcon = this.container.querySelector('.weather__icon');
    this.weatherTemp = this.container.querySelector('.weather__temp');
    this.weatherFeel = this.container.querySelector('.weather__feel');
    this.weatherDescr = this.container.querySelector('.weather__descr');
    this.windSpeed = this.container.querySelector('.weather__wind-speed');
    this.windArrow = this.container.querySelector('.weather__wind-arrow');
    this.windDescr = this.container.querySelector('.weather__wind-descr');
    this.weatherHumidity = this.container.querySelector('.weather__humidity');
    this.cityTime = this.container.querySelector('.weather__city-time');
  }

  async setWeather() {
    this.dataWrapper.classList.remove('js-show-elem');
    this.weatherCountry.classList.remove('js-show-elem');
    this.weatherLines.forEach((item) => {
      item.classList.remove('js-weather-line');
    });

    if (this.warnMessage) this.warnMessage.remove();

    try {
      this.weatherData = await getWeather(this.weatherCity.value);

      if (this.weatherData.cod === 200) {
        this.weatherCity.value = `${this.weatherCity.value[0].toUpperCase()}${this.weatherCity.value.slice(
          1
        )}`;
        localStorage.setItem('vigitory-city', this.weatherCity.value);

        this.weatherLines.forEach((item) => {
          item.classList.add('js-weather-line');
        });
      }

      this.dataWrapper.classList.add('js-show-elem');
      this.weatherCountry.classList.add('js-show-elem');
      this.weatherIcon.className = 'weather__icon owf';
      this.weatherIcon.classList.add(`owf-${this.weatherData.weather[0].id}`);

      this.weatherCountry.textContent = `${
        countryNames[this.weatherData.sys.country]
      }`;
      this.weatherTemp.textContent = `${Math.round(
        this.weatherData.main.temp
      )}°C`;
      this.weatherFeel.textContent = `Feels like ${Math.round(
        this.weatherData.main.feels_like
      )}°C`;
      this.weatherDescr.textContent = `${this.weatherData.weather[0].description[0].toUpperCase()}${this.weatherData.weather[0].description.slice(
        1
      )}`;
      this.windSpeed.textContent = `Wind: ${Math.round(
        this.weatherData.wind.speed
      )}m/s,`;
      this.weatherHumidity.textContent = `Humidity: ${this.weatherData.main.humidity}%`;
      this.windDescr.textContent = `${
        windDirections[this.findDirection(this.weatherData.wind.deg)]
      }`;

      this.windArrow.style.transform = `rotate(${
        this.weatherData.wind.deg - 180
      }deg)`;
      this.windArrow.style.backgroundImage =
        'url("./assets/svg/wind-arrow.svg")';
    } catch (err) {
      this.weatherCity.value = '';
      this.cityTime.textContent = '';

      this.weatherCountry.textContent = '';
      this.weatherIcon.textContent = '';
      this.weatherTemp.textContent = '';
      this.weatherFeel.textContent = '';
      this.weatherDescr.textContent = '';
      this.windSpeed.textContent = '';
      this.windArrow.style.backgroundImage = 'none';
      this.windDescr.textContent = '';
      this.weatherHumidity.textContent = '';

      this.warnMessage.classList.add('js-show-elem');
      this.warnMessage.classList.add('js-weather-warn');
      this.warnMessage.textContent = 'No weather data';
      this.dataWrapper.insertAdjacentElement('beforebegin', this.warnMessage);
    }
  }

  async setCityTime() {
    try {
      const timezone = await this.weatherData.timezone;

      if (!timezone && timezone !== 0) return;

      const date = new Date();
      const time = date.getTime();
      const timeOffset = date.getTimezoneOffset() * 60000;
      const utc = time + timeOffset;
      const localTime = utc + 1000 * timezone;
      const localDate = new Date(localTime);

      let hours = localDate.getHours();
      let minutes = localDate.getMinutes();

      if (hours < 10) hours = `0${hours}`;
      if (minutes < 10) minutes = `0${minutes}`;

      this.cityTime.textContent = `${hours}:${minutes}`;

      this.cityTime.classList.add('js-show-elem');
    } catch (err) {}
  }

  findDirection(windDdegrees) {
    let degrees = (windDdegrees * 16) / 360;

    degrees = Math.round(degrees, 0);
    degrees = (degrees + 16) % 16;

    return degrees;
  }

  addListeners() {
    this.weatherCity.addEventListener('change', () => {
      if (this.weatherCity.value !== '') this.setWeather();
    });
  }

  init() {
    this.getElements();
    this.setWeather();
    this.addListeners();

    setInterval(() => this.setWeather(), 20 * 60000);
    setInterval(() => this.setCityTime(), 1000);
  }
}
