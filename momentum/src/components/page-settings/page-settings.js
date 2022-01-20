export default class PageSettings {
  constructor() {
    this.container = document.createElement('section');
    this.container.classList.add('page__settings', 'page-settings');
  }

  render() {
    this.container.innerHTML = `
      <h2 class="visually-hidden">Settings</h2>
      <p class="page-settings__title">Click to hide/show widget</p>
      <div class="page-settings__wrapper">
        <div class="page-settings__button-wrapper">
          <input class="page-settings__button" id="checkbox-player" type="checkbox" value="P" aria-label="checkbox-player" checked>
          <span class="page-settings__clue">Player</span>
        </div>
        <div class="page-settings__button-wrapper">
          <input class="page-settings__button" id="checkbox-weather" type="checkbox" value="W" aria-label="checkbox-weather" checked>
          <span class="page-settings__clue">Weather</span>
        </div>
        <div class="page-settings__button-wrapper">
          <input class="page-settings__button" id="checkbox-date" type="checkbox" value="D" aria-label="checkbox-date" checked>
          <span class="page-settings__clue">Date</span>
        </div>
        <div class="page-settings__button-wrapper">
          <input class="page-settings__button" id="checkbox-quotes" type="checkbox" value="Q" aria-label="checkbox-quotes" checked>
          <span class="page-settings__clue">Quotes</span>
        </div>
        <div class="page-settings__button-wrapper">
          <input class="page-settings__button" id="checkbox-todo" type="checkbox" value="T" aria-label="checkbox-todo" checked>
          <span class="page-settings__clue">Todo</span>
        </div>
        <div class="page-settings__button-wrapper">
          <input class="page-settings__button" id="checkbox-footer" type="checkbox" value="F" aria-label="checkbox-footer" checked>
          <span class="page-settings__clue">Footer</span>
        </div>
      </div>
    `;

    return this.container;
  }

  getElements() {
    this.inputsWrapper = this.container.querySelector(
      '.page-settings__wrapper'
    );
    this.inputs = this.container.querySelectorAll('.page-settings__button');
  }

  addListeners() {
    this.inputsWrapper.addEventListener('click', (event) => {
      const inputId = event.target.getAttribute('id').split('-')[1];
      const section = document.querySelector(`#section-${inputId}`);

      section.classList.toggle('js-hide-section');
      event.target.classList.toggle('js-active-btn');
    });

    window.addEventListener('beforeunload', () => {
      this.inputs.forEach((input) => {
        const inputId = input.getAttribute('id').split('-')[1];

        if (input.checked)
          localStorage.setItem(`vigitory-${inputId}`, 'visible');
        else localStorage.setItem(`vigitory-${inputId}`, 'hidden');
      });
    });

    document.addEventListener('DOMContentLoaded', () => {
      this.inputs.forEach((input) => {
        const inputId = input.getAttribute('id').split('-')[1];
        const section = document.querySelector(`#section-${inputId}`);

        if (localStorage.getItem(`vigitory-${inputId}`) === 'visible') {
          input.setAttribute('checked', '');
          section.classList.remove('js-hide-section');
          input.classList.add('js-active-btn');
        } else if (localStorage.getItem(`vigitory-${inputId}`) === 'hidden') {
          input.removeAttribute('checked');
          section.classList.add('js-hide-section');
          input.classList.remove('js-active-btn');
        } else {
          input.classList.add('js-active-btn');
          section.classList.remove('js-hide-section');
        }
      });
    });
  }

  init() {
    this.getElements();
    this.addListeners();
  }
}
