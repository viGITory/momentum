import getQuotes from '../../api/quotes-api';

export default class Quotes {
  constructor() {
    this.quoteButton = document.querySelector('.quotes__button');
    this.quoteText = document.querySelector('.quotes__text');
    this.quoteAuthor = document.querySelector('.quotes__author');

    this.quoteId = null;
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
      this.quoteText.classList.add('js-show-quote');
    }
  }

  addListeners() {
    this.quoteButton.addEventListener('click', () => {
      this.quoteButton.classList.add('js-rotate-btn');
    });

    this.quoteButton.addEventListener('animationend', () => {
      this.quoteButton.classList.remove('js-rotate-btn');
      this.quoteText.classList.remove('js-show-quote');
      this.setQuotes();
    });
  }

  init() {
    this.setQuotes();
    this.addListeners();
  }
}
