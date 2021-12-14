export default class Settings {
  constructor() {
    this.playerSection = document.querySelector('.audio-player');
    this.weatherSection = document.querySelector('.weather');
    this.dateSection = document.querySelector('.date');
    this.quotesSection = document.querySelector('.quotes');
    this.footer = document.querySelector('.main-footer');

    this.buttonsWrapper = document.querySelector('.settings__wrapper');

    this.buttonPlayer = document.querySelector('.settings__button--player');
    this.buttonWeather = document.querySelector('.settings__button--weather');
    this.buttonDate = document.querySelector('.settings__button--date');
    this.buttonQuotes = document.querySelector('.settings__button--quotes');
    this.buttonFooter = document.querySelector('.settings__button--footer');
  }

  addListeners() {
    this.buttonsWrapper.addEventListener('click', (event) => {
      if (event.target === this.buttonPlayer)
        this.playerSection.classList.toggle('js-hide-section');
      else if (event.target === this.buttonWeather)
        this.weatherSection.classList.toggle('js-hide-section');
      else if (event.target === this.buttonDate)
        this.dateSection.classList.toggle('js-hide-section');
      else if (event.target === this.buttonQuotes)
        this.quotesSection.classList.toggle('js-hide-section');
      else if (event.target === this.buttonFooter)
        this.footer.classList.toggle('js-hide-section');
    });
  }

  init() {
    this.addListeners();
  }
}
