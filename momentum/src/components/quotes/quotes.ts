import getApiData from '../../api/get-api-data';

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

  public render(): HTMLElement {
    this.container.innerHTML = `
      <h2 class="visually-hidden">Quotes</h2>
      <button class="quotes__button" type="button" aria-label="update-quote">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="3 3.02 18 17.97"><path d="M17 18.246a8 8 0 0 0-4.505-14.23.5.5 0 1 1 .061-1A9.002 9.002 0 0 1 21 12a8.986 8.986 0 0 1-3.342 7H20.5a.5.5 0 1 1 0 1h-4a.5.5 0 0 1-.5-.5v-4a.5.5 0 1 1 1 0v2.746ZM7 5.754a8 8 0 0 0 4.54 14.233.5.5 0 0 1-.056.998C6.734 20.717 3 16.778 3 12a8.986 8.986 0 0 1 3.342-7H3.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V5.754Z"/></svg>
      </button>
      <div class="quotes__wrapper"></div>
    `;

    return this.container;
  }

  private getElements(): void {
    this.quotesWrapper = this.container.querySelector(
      '.quotes__wrapper'
    ) as HTMLDivElement;
    this.quoteButton = this.container.querySelector(
      '.quotes__button'
    ) as HTMLButtonElement;
  }

  private async setQuotes(): Promise<void> {
    try {
      const quoteData = await getApiData(
        `https://genius-quotes.herokuapp.com/api/quotes/random?prev=${this.quoteId}`
      );
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

  private addListeners(): void {
    this.quoteButton.addEventListener('click', () => {
      this.quoteButton.classList.add('js-rotate-btn');
    });

    this.quoteButton.addEventListener('animationend', () => {
      this.quoteButton.classList.remove('js-rotate-btn');
      this.setQuotes();
    });
  }

  public init(): void {
    this.getElements();
    this.setQuotes();
    this.addListeners();
  }
}
