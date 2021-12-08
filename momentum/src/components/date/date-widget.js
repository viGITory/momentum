export default class DateWidget {
  constructor() {
    this.dateHours = document.querySelector('.date__hour');
    this.dateMinutes = document.querySelector('.date__minute');
    this.dateSeconds = document.querySelector('.date__second');
    this.dateDay = document.querySelector('.date__day');
    this.dateGreeting = document.querySelector('.date__greeting');
    this.userName = document.querySelector('.date__input');
  }

  setDate() {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    const timesOfDay = ['night', 'morning', 'afternoon', 'evening'];

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
    this.dateGreeting.textContent = `Good ${
      timesOfDay[Math.floor(hours / 6)]
    },`;

    setTimeout(() => this.setDate(), 1000);
  }

  addListeners() {
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('vigitory-name', this.userName.value);
    });

    document.addEventListener('DOMContentLoaded', () => {
      if (localStorage.getItem('vigitory-name')) {
        this.userName.value = localStorage.getItem('vigitory-name');
      }
    });
  }

  init() {
    this.setDate();
    this.addListeners();
  }
}
