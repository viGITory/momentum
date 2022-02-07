import WeatherResponse from './weather.d';
import windDirections from '../../data/wind-directions';
import countryNames from '../../data/country-names';
import findDirection from '../../utils/find-direction';
import getApiData from '../../api/get-api-data';
import createMap from '../../utils/create-map';

export default class Weather {
  container: HTMLElement;
  city!: HTMLInputElement;
  cityTime!: HTMLParagraphElement;
  dataWrapper!: HTMLDivElement;

  weatherData!: WeatherResponse;

  constructor() {
    this.container = document.createElement('section') as HTMLElement;
    this.container.classList.add('section', 'weather');
    this.container.id = 'section-weather';
  }

  public render(): HTMLElement {
    this.container.innerHTML = `
      <h2 class="visually-hidden">Weather</h2>
      <div class="weather__city">
        <input class="weather__input" type="text" placeholder="[Enter city]" value="${
          localStorage.getItem('vigitory-city') || 'Minsk'
        }" aria-label="user-city">
        <p class="weather__city-time"></p>
      </div>
      <div class="weather__data"></div>
    `;

    return this.container;
  }

  private getElements(): void {
    this.city = this.container.querySelector(
      '.weather__input'
    ) as HTMLInputElement;
    this.cityTime = this.container.querySelector(
      '.weather__city-time'
    ) as HTMLParagraphElement;
    this.dataWrapper = this.container.querySelector(
      '.weather__data'
    ) as HTMLDivElement;
  }

  private async setWeather(): Promise<void> {
    this.dataWrapper.classList.remove('js-show-elem');

    try {
      this.city.value = this.city.value.trim();

      if (this.city.value === '')
        this.city.value = localStorage.getItem('vigitory-city') || 'Minsk';

      this.weatherData = await getApiData(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.city.value}&lang=en&appid=a8122fbe52b443584fbcba6f23095ca1&units=metric`
      );

      if (this.weatherData.cod === 200) {
        this.city.value = `${this.city.value[0]?.toUpperCase()}${this.city.value.slice(
          1
        )}`;
        localStorage.setItem('vigitory-city', this.city.value);
      }

      this.dataWrapper.innerHTML = `
        <div class="weather__map-wrapper"></div>
        <div class="weather__country-wrapper">
          <span class="weather__line"></span>
          <p class="weather__country">${
            countryNames[this.weatherData.sys.country]
          }</p>
          <span class="weather__line"></span>
        </div>
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

      this.dataWrapper.classList.add('js-show-elem');

      createMap(this.weatherData.coord.lat, this.weatherData.coord.lon);
    } catch (err) {
      this.dataWrapper.innerHTML = `
        <p class="weather__warn">No weather data</p>
      `;

      this.city.value = '';
      this.cityTime.textContent = '';
    }
  }

  private setCityTime(timezone: number): void {
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
  }

  private addListeners(): void {
    this.city.addEventListener('change', () => {
      if (this.city.value !== '') this.setWeather();
    });
  }

  private addIntervals(): void {
    setInterval(() => this.setWeather(), 20 * 60000);
    setInterval(() => this.setCityTime(this.weatherData.timezone), 1000);
  }

  public init(): void {
    this.getElements();
    this.setWeather();
    this.addListeners();
    this.addIntervals();
  }
}
