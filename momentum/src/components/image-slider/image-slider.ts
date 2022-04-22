import timesOfDay from '../../data/times-of-day';
import getApiData from '../../api/get-api-data';

export default class ImageSlider {
  container: HTMLDivElement;
  arrowPrev!: HTMLButtonElement;
  arrowNext!: HTMLButtonElement;

  randomNum: number;

  constructor() {
    this.container = document.createElement('div') as HTMLDivElement;
    this.container.classList.add('image-slider');

    this.randomNum = Math.floor(1 + Math.random() * 19);
  }

  public render(): HTMLDivElement {
    this.container.innerHTML = `
      <button class="image-slider__arrow image-slider__arrow--prev" type="button" aria-label="slider-prev">
        <svg width="10" height="20" pointer-events="none" xmlns="http://www.w3.org/2000/svg" viewBox="153.11 50.2 214.9 399.8"><path d="M353 450a15 15 0 0 1-10.61-4.39L157.5 260.71a15 15 0 0 1 0-21.21L342.39 54.6a15 15 0 1 1 21.22 21.21L189.32 250.1l174.29 174.29A15 15 0 0 1 353 450Z" /></svg>
      </button>
      <button class="image-slider__arrow image-slider__arrow--next" type="button" aria-label="slider-next">
        <svg width="10" height="20" pointer-events="none" xmlns="http://www.w3.org/2000/svg" viewBox="187.1 50.39 214.9 399.61"><path d="M 202.1 450 a 15 15 0 0 1 -10.6 -25.61 L 365.79 250.1 L 191.5 75.81 a 15 15 0 0 1 21.21 -21.21 l 184.9 184.9 a 15 15 0 0 1 0 21.21 l -184.9 184.9 A 15 15 0 0 1 202.1 450 Z" /></svg>
      </button>
    `;

    return this.container;
  }

  private getElements(): void {
    this.arrowPrev = this.container.querySelector(
      '.image-slider__arrow--prev'
    ) as HTMLButtonElement;
    this.arrowNext = this.container.querySelector(
      '.image-slider__arrow--next'
    ) as HTMLButtonElement;
  }

  public async setImage(): Promise<void> {
    const dayPart = timesOfDay[Math.floor(new Date().getHours() / 6)];

    try {
      let imageData;

      if (this.randomNum < 10)
        imageData = await getApiData(
          `https://raw.githubusercontent.com/viGITory/momentum-images/main/${dayPart}/0${this.randomNum}.jpg`
        );
      else
        imageData = await getApiData(
          `https://raw.githubusercontent.com/viGITory/momentum-images/main/${dayPart}/${this.randomNum}.jpg`
        );

      this.container.style.backgroundImage = `url(${URL.createObjectURL(
        imageData
      )}`;
      this.container.style.opacity = '1';
    } catch (err) {}
  }

  private addListeners(): void {
    document.addEventListener('click', (event) => {
      if (event.target === this.arrowPrev) {
        if (this.randomNum <= 1) {
          this.randomNum = 20;
        } else {
          this.randomNum -= 1;
        }
        this.setImage();
      } else if (event.target === this.arrowNext) {
        if (this.randomNum === 20) {
          this.randomNum = 1;
        } else {
          this.randomNum = +this.randomNum + 1;
        }
        this.setImage();
      }
    });
  }

  public init(): void {
    this.getElements();
    this.setImage();
    this.addListeners();
  }
}
