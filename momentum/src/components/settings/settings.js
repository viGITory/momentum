export default class Settings {
  constructor() {
    this.inputsWrapper = document.querySelector('.settings__wrapper');
    this.inputs = document.querySelectorAll('.settings__button');
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
          input.setAttribute('checked', true);
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
    this.addListeners();
  }
}
