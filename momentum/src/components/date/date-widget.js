import Background from '../background/background';

export default class DateWidget {
  constructor() {
    this.dateHours = document.querySelector('.date__hour');
    this.dateMinutes = document.querySelector('.date__minute');
    this.dateSeconds = document.querySelector('.date__second');
    this.dateDay = document.querySelector('.date__day');
    this.dateGreeting = document.querySelector('.date__greeting');
    this.userName = document.querySelector('.date__input');

    this.format12 = document.querySelector('.time-format__item--12');
    this.format24 = document.querySelector('.time-format__item--24');
    this.formatAM = document.querySelector('.time-format__item--am');
    this.formatPM = document.querySelector('.time-format__item--pm');

    this.timeFormat = +localStorage.getItem('vigitory-timeFormat') || 24;

    this.backgroundSlider = new Background();
  }

  setDate() {
    const timesOfDay = ['night', 'morning', 'afternoon', 'evening'];
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    this.dateGreeting.textContent = `Good ${
      timesOfDay[Math.floor(hours / 6)]
    },`;

    if (hours % 6 === 0 && minutes === 0 && seconds === 0) {
      this.backgroundSlider.setImage();
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

    this.dateHours.textContent = `${hours} : `;
    this.dateMinutes.textContent = `${minutes} : `;
    this.dateSeconds.textContent = `${seconds}`;

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
      localStorage.setItem('vigitory-name', this.userName.value);
    });

    document.addEventListener('DOMContentLoaded', () => {
      if (this.timeFormat === 12) this.format12.classList.add('js-active-btn');
      else if (this.timeFormat === 24)
        this.format24.classList.add('js-active-btn');

      if (localStorage.getItem('vigitory-name')) {
        this.userName.value = localStorage.getItem('vigitory-name');
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
    this.setDate();
    this.addListeners();
  }
}
