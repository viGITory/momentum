import getQuotes from '../../api/quotes-api';

export default class Quotes {
  container: HTMLElement;
  quotesWrapper!: HTMLDivElement;
  quoteButton!: HTMLButtonElement;

  quoteId: number | null;

  constructor() {
    this.container = document.createElement('section');
    this.container.classList.add('section', 'quotes');
    this.container.id = 'section-quotes';

    this.quoteId = null;
  }

  render(): HTMLElement {
    this.container.innerHTML = `
      <h2 class="visually-hidden">Quotes</h2>
      <button class="quotes__button" type="button">
        <span class="visually-hidden">Update quotes</span>
      </button>
      <div class="quotes__wrapper"></div>
    `;

    return this.container;
  }

  getElements(): void {
    this.quotesWrapper = this.container.querySelector(
      '.quotes__wrapper'
    ) as HTMLDivElement;
    this.quoteButton = this.container.querySelector(
      '.quotes__button'
    ) as HTMLButtonElement;
  }

  async setQuotes(): Promise<void> {
    try {
      const quoteData = await getQuotes(this.quoteId);
      this.quoteId = quoteData.id;

      this.quotesWrapper.innerHTML = `
        <p class="quotes__text">"${quoteData.text}"</p>
        <p class="quotes__author">${quoteData.author}</p>
      `;
    } catch (err) {
      this.quotesWrapper.innerHTML = `
        <p class="quotes__warn">No quotes data</p>
      `;
    }
  }

  addListeners(): void {
    this.quoteButton.addEventListener('click', () => {
      this.quoteButton.classList.add('js-rotate-btn');
    });

    this.quoteButton.addEventListener('animationend', () => {
      this.quoteButton.classList.remove('js-rotate-btn');
      this.setQuotes();
    });
  }

  init(): void {
    this.getElements();
    this.setQuotes();
    this.addListeners();
  }
}
