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
        <input class="page-settings__button" id="checkbox-player" type="checkbox" value="P" aria-label="checkbox-player" checked>
        <input class="page-settings__button" id="checkbox-weather" type="checkbox" value="W" aria-label="checkbox-weather" checked>
        <input class="page-settings__button" id="checkbox-date" type="checkbox" value="D" aria-label="checkbox-date" checked>
        <input class="page-settings__button" id="checkbox-quotes" type="checkbox" value="Q" aria-label="checkbox-quotes" checked>
        <input class="page-settings__button" id="checkbox-todo" type="checkbox" value="T" aria-label="checkbox-todo" checked>
        <input class="page-settings__button" id="checkbox-footer" type="checkbox" value="F" aria-label="checkbox-footer" checked>
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
