import WeatherResponse from './weather.d';
import windDirections from '../../data/wind-directions';
import countryNames from '../../data/country-names';
import findDirection from '../../utils/find-direction';
import getApiData from '../../api/get-api-data';
import createMap from '../../utils/create-map';

export default class Weather {
  container: HTMLElement;
  weatherCity!: HTMLInputElement;
  cityTime!: HTMLParagraphElement;
  weatherCountry!: HTMLParagraphElement;
  weatherLines!: HTMLSpanElement[];
  dataWrapper!: HTMLDivElement;

  weatherData!: WeatherResponse;

  constructor() {
    this.container = document.createElement('section') as HTMLElement;
    this.container.classList.add('section', 'weather');
    this.container.id = 'section-weather';
  }

  render(): HTMLElement {
    this.container.innerHTML = `
      <h2 class="visually-hidden">Weather</h2>
      <div class="weather__map-wrapper"></div>
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

  getElements(): void {
    this.weatherCity = this.container.querySelector(
      '.weather__input'
    ) as HTMLInputElement;
    this.cityTime = this.container.querySelector(
      '.weather__city-time'
    ) as HTMLParagraphElement;
    this.weatherCountry = this.container.querySelector(
      '.weather__country'
    ) as HTMLParagraphElement;
    this.weatherLines = Array.from(
      this.container.querySelectorAll<HTMLSpanElement>('.weather__line')
    );
    this.dataWrapper = this.container.querySelector(
      '.weather__data'
    ) as HTMLDivElement;
  }

  async setWeather(): Promise<void> {
    this.weatherCountry.classList.remove('js-show-elem');
    this.dataWrapper.classList.remove('js-show-elem');
    this.weatherLines.forEach((item) => {
      item.classList.remove('js-line-through');
    });

    try {
      this.weatherCity.value = this.weatherCity.value.trim();

      if (this.weatherCity.value === '')
        this.weatherCity.value =
          localStorage.getItem('vigitory-city') || 'Minsk';

      this.weatherData = await getApiData(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.weatherCity.value}&lang=en&appid=a8122fbe52b443584fbcba6f23095ca1&units=metric`
      );

      createMap(this.weatherData.coord.lat, this.weatherData.coord.lon);

      if (this.weatherData.cod === 200) {
        this.weatherCity.value = `${this.weatherCity.value[0]?.toUpperCase()}${this.weatherCity.value.slice(
          1
        )}`;
        localStorage.setItem('vigitory-city', this.weatherCity.value);

        this.weatherLines.forEach((item) => {
          item.classList.add('js-line-through');
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
        <p class="weather__text weather__descr">${this.weatherData.weather[0].description[0]?.toUpperCase()}${this.weatherData.weather[0].description.slice(
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

  async setCityTime(): Promise<void> {
    try {
      const timezone = await this.weatherData.timezone;

      if (!timezone && timezone !== 0) return;

      const date = new Date();
      const time = date.getTime();
      const timeOffset = date.getTimezoneOffset() * 60000;
      const utc = time + timeOffset;
      const localTime = utc + 1000 * timezone;
      const localDate = new Date(localTime);

      let hours: number | string = localDate.getHours();
      let minutes: number | string = localDate.getMinutes();

      if (hours < 10) hours = `0${hours}`;
      if (minutes < 10) minutes = `0${minutes}`;

      this.cityTime.textContent = `${hours}:${minutes}`;

      this.cityTime.classList.add('js-show-elem');
    } catch (err) {}
  }

  addListeners(): void {
    this.weatherCity.addEventListener('change', () => {
      if (this.weatherCity.value !== '') this.setWeather();
    });
  }

  init(): void {
    this.getElements();
    this.setWeather();
    this.addListeners();

    setInterval(() => this.setWeather(), 20 * 60000);
    setInterval(() => this.setCityTime(), 1000);
  }
}
