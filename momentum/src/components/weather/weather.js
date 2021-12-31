import getWeather from '../../api/weather-api';
import windDirections from '../../data/wind-directions';
import countryNames from '../../data/country-names';
import findDirection from '../../utils/find-direction';

export default class Weather {
  constructor() {
    this.container = document.createElement('section');
    this.container.classList.add('section', 'weather');
    this.container.id = 'section-weather';
  }

  render() {
    this.container.innerHTML = `
      <h2 class="visually-hidden">Weather</h2>
      <div class="weather__map-wrapper">
        <div class="weather__map" id="map"></div>
      </div>
      <div class="weather__top-wrapper">
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
      <div class="weather__data"></div>
    `;

    return this.container;
  }

  getElements() {
    this.weatherCity = this.container.querySelector('.weather__input');
    this.cityTime = this.container.querySelector('.weather__city-time');
    this.weatherCountry = this.container.querySelector('.weather__country');
    this.weatherLines = this.container.querySelectorAll('.weather__line');
    this.dataWrapper = this.container.querySelector('.weather__data');
  }

  setMap(lat, lon) {
    if (this.map) this.map.remove();

    this.map = L.map('map', {
      center: [lat, lon],
      zoom: 8,
      attributionControl: false,
      zoomControl: false,
    });

    L.tileLayer(
      'https://api.mapbox.com/styles/v1/pantory/ckxn8k9633p8415rqenh18x11/draft/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicGFudG9yeSIsImEiOiJja3RvdWtrcTcwZ2JmMnVvYXhzcTJ1Ymx2In0.iHARQCH0cLkTZ2s52LQ-HQ',
      {
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          'pk.eyJ1IjoicGFudG9yeSIsImEiOiJja3RvdWtrcTcwZ2JmMnVvYXhzcTJ1Ymx2In0.iHARQCH0cLkTZ2s52LQ-HQ',
      }
    ).addTo(this.map);
  }

  async setWeather() {
    this.weatherCountry.classList.remove('js-show-elem');
    this.dataWrapper.classList.remove('js-show-elem');
    this.weatherLines.forEach((item) => {
      item.classList.remove('js-weather-line');
    });

    try {
      this.weatherCity.value = this.weatherCity.value.trim();

      if (this.weatherCity.value === '')
        this.weatherCity.value =
          localStorage.getItem('vigitory-city') || 'Minsk';

      this.weatherData = await getWeather(this.weatherCity.value);
      this.setMap(this.weatherData.coord.lat, this.weatherData.coord.lon);

      if (this.weatherData.cod === 200) {
        this.weatherCity.value = `${this.weatherCity.value[0].toUpperCase()}${this.weatherCity.value.slice(
          1
        )}`;
        localStorage.setItem('vigitory-city', this.weatherCity.value);

        this.weatherLines.forEach((item) => {
          item.classList.add('js-weather-line');
        });
      }

      this.dataWrapper.innerHTML = `
        <p class="weather__temp-wrapper">
          <span class="weather__icon weather__icon owf owf-${
            this.weatherData.weather[0].id
          }"></span>
          <span class="weather__temp">${Math.round(
            this.weatherData.main.temp
          )}°C</span>
          <span class="weather__feel">Feels like ${Math.round(
            this.weatherData.main.feels_like
          )}°C</span>
        </p>
        <p class="weather__text weather__descr">${this.weatherData.weather[0].description[0].toUpperCase()}${this.weatherData.weather[0].description.slice(
        1
      )}</p>
        <p class="weather__text weather__wind">
          <span class="weather__wind-speed">Wind: ${Math.round(
            this.weatherData.wind.speed
          )}m/s,</span>
          <span class="weather__wind-arrow" style="transform: rotate(${
            this.weatherData.wind.deg - 180
          }deg)"></span>
          <span class="weather__wind-descr">${
            windDirections[findDirection(this.weatherData.wind.deg)]
          }</span>
        </p>
        <p class="weather__text weather__humidity">Humidity: ${
          this.weatherData.main.humidity
        }%</p>
      `;

      this.weatherCountry.classList.add('js-show-elem');
      this.dataWrapper.classList.add('js-show-elem');

      this.weatherCountry.textContent = `${
        countryNames[this.weatherData.sys.country]
      }`;
    } catch (err) {
      this.dataWrapper.innerHTML = `
        <span class="js-weather-warn js-show-elem">No weather data</span>
      `;

      this.weatherCity.value = '';
      this.cityTime.textContent = '';
      this.weatherCountry.textContent = '';
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
