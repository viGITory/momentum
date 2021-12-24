import getQuotes from '../../api/quotes-api';

export default class Quotes {
  constructor() {
    this.container = document.createElement('section');
    this.container.classList.add('section', 'quotes');
    this.container.id = 'section-quotes';

    this.quoteId = null;
  }

  render() {
    this.container.innerHTML = `
      <h2 class="visually-hidden">Quotes</h2>
      <button class="quotes__button" type="button">
        <span class="visually-hidden">Update quotes</span>
      </button>
      <p class="quotes__text"></p>
      <p class="quotes__author"></p>
    `;

    return this.container;
  }

  getElements() {
    this.quoteText = this.container.querySelector('.quotes__text');
    this.quoteAuthor = this.container.querySelector('.quotes__author');
    this.quoteButton = this.container.querySelector('.quotes__button');
  }

  async setQuotes() {
    try {
      const quoteData = await getQuotes(this.quoteId);
      this.quoteId = quoteData.id;

      this.quoteText.textContent = `"${quoteData.text}"`;
      this.quoteAuthor.textContent = quoteData.author;
    } catch (err) {
      this.quoteText.textContent = 'No quotes data';
      this.quoteAuthor.textContent = '';
    } finally {
      this.quoteText.classList.add('js-show-elem');
    }
  }

  addListeners() {
    this.quoteButton.addEventListener('click', () => {
      this.quoteButton.classList.add('js-rotate-btn');
    });

    this.quoteButton.addEventListener('animationend', () => {
      this.quoteButton.classList.remove('js-rotate-btn');
      this.quoteText.classList.remove('js-show-elem');
      this.setQuotes();
    });
  }

  init() {
    this.getElements();
    this.setQuotes();
    this.addListeners();
  }
}
