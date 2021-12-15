export default class DateWidget {
  constructor() {
    this.dateHours = document.querySelector('.date__hour');
    this.dateMinutes = document.querySelector('.date__minute');
    this.dateSeconds = document.querySelector('.date__second');
    this.dateDay = document.querySelector('.date__day');
    this.dateGreeting = document.querySelector('.date__greeting');
    this.userName = document.querySelector('.date__input');

    this.formatWrapper = document.querySelector('.date__format');
    this.buttonFormat12 = document.querySelector('.date__format-item--12');
    this.buttonFormat24 = document.querySelector('.date__format-item--24');

    this.timeFormat = +localStorage.getItem('vigitory-timeFormat') || 24;
  }

  setDate() {
    const timesOfDay = ['night', 'morning', 'afternoon', 'evening'];
    const date = new Date();
    let hours = date.getHours();

    this.dateGreeting.textContent = `Good ${
      timesOfDay[Math.floor(hours / 6)]
    },`;

    hours =
      this.timeFormat === 24 ? date.getHours() : date.getHours() % 12 || 12;
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

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
      if (this.timeFormat === 12)
        this.buttonFormat12.classList.add('js-active-btn');
      else if (this.timeFormat === 24)
        this.buttonFormat24.classList.add('js-active-btn');

      if (localStorage.getItem('vigitory-name')) {
        this.userName.value = localStorage.getItem('vigitory-name');
      }
    });

    this.formatWrapper.addEventListener('click', (event) => {
      if (event.target === this.buttonFormat12) {
        this.timeFormat = 12;
        this.buttonFormat24.classList.remove('js-active-btn');
        this.buttonFormat12.classList.add('js-active-btn');
      } else if (event.target === this.buttonFormat24) {
        this.timeFormat = 24;
        this.buttonFormat12.classList.remove('js-active-btn');
        this.buttonFormat24.classList.add('js-active-btn');
      }
    });
  }

  init() {
    this.setDate();
    this.addListeners();
  }
}
