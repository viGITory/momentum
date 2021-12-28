import ImageSlider from '../image-slider/image-slider';
import timesOfDay from '../../data/times-of-day';

export default class DateWidget {
  constructor() {
    this.container = document.createElement('section');
    this.container.classList.add('section', 'date');
    this.container.id = 'section-date';

    this.timeFormat = +localStorage.getItem('vigitory-timeFormat') || 24;

    this.imageSlider = new ImageSlider();
  }

  render() {
    this.container.innerHTML = `
      <h2 class="visually-hidden">Date</h2>
      <div class="date__time-wrapper">
        <p class="date__time"></p>
        <div class="date__format time-format">
          <div class="time-format__wrapper">
            <button class="time-format__item time-format__item--12" type="button">12</button>
            <button class="time-format__item time-format__item--24" type="button">24</button>
          </div>
          <div class="time-format__wrapper">
            <span class="time-format__item time-format__item--am">AM</span>
            <span class="time-format__item time-format__item--pm">PM</span>
          </div>
        </div>
      </div>
      <div class="date__day-wrapper">
        <p class="date__day"></p>
      </div>
      <p class="date__greeting-wrapper">
        <span class="date__greeting"></span>
        <input class="date__input" type="text" placeholder="[Enter your name]" aria-label="username">
      </p>
    `;

    return this.container;
  }

  getElements() {
    this.dateTime = this.container.querySelector('.date__time');
    this.dateDay = this.container.querySelector('.date__day');
    this.dateGreeting = this.container.querySelector('.date__greeting');

    this.userName = this.container.querySelector('.date__input');

    this.format12 = this.container.querySelector('.time-format__item--12');
    this.format24 = this.container.querySelector('.time-format__item--24');
    this.formatAM = this.container.querySelector('.time-format__item--am');
    this.formatPM = this.container.querySelector('.time-format__item--pm');
  }

  setDate() {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    this.dateGreeting.textContent = `Good ${
      timesOfDay[Math.floor(hours / 6)]
    },`;

    if (hours % 6 === 0 && minutes === 0 && seconds === 0) {
      this.imageSlider.setImage();
    }

    if (hours >= 12 && hours < 24) {
      this.formatPM.classList.add('js-active-btn');
      this.formatAM.classList.remove('js-active-btn');
    } else {
      this.formatPM.classList.remove('js-active-btn');
      this.formatAM.classList.add('js-active-btn');
    }

    hours =
      this.timeFormat === 24 ? date.getHours() : date.getHours() % 12 || 12;

    if (hours < 10) hours = `0${hours}`;
    if (minutes < 10) minutes = `0${minutes}`;
    if (seconds < 10) seconds = `0${seconds}`;

    this.dateTime.innerHTML = `
      ${hours} : ${minutes} : <span class="date__second">${seconds}</span>
    `;

    this.dateDay.textContent = date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });

    setTimeout(() => this.setDate(), 1000);
  }

  addListeners() {
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('vigitory-timeFormat', this.timeFormat);

      if (this.userName.value)
        localStorage.setItem('vigitory-userName', this.userName.value);
      else localStorage.removeItem('vigitory-userName');
    });

    document.addEventListener('DOMContentLoaded', () => {
      if (this.timeFormat === 12) this.format12.classList.add('js-active-btn');
      else if (this.timeFormat === 24)
        this.format24.classList.add('js-active-btn');

      if (localStorage.getItem('vigitory-userName')) {
        this.userName.value = localStorage.getItem('vigitory-userName');
      }
    });

    this.format12.addEventListener('click', () => {
      this.timeFormat = 12;
      this.format24.classList.remove('js-active-btn');
      this.format12.classList.add('js-active-btn');
    });

    this.format24.addEventListener('click', () => {
      this.timeFormat = 24;
      this.format12.classList.remove('js-active-btn');
      this.format24.classList.add('js-active-btn');
    });
  }

  init() {
    this.getElements();
    this.setDate();
    this.addListeners();
  }
}
