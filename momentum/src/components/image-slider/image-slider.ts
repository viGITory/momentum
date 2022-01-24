import timesOfDay from '../../data/times-of-day';
import getApiData from '../../api/get-api-data';

export default class ImageSlider {
  container: HTMLDivElement;
  arrowPrev!: HTMLButtonElement;
  arrowNext!: HTMLButtonElement;

  randomNum: number;

  constructor() {
    this.container = document.createElement('div') as HTMLDivElement;
    this.container.classList.add('background');

    this.randomNum = Math.floor(1 + Math.random() * 19);
  }

  render(): HTMLDivElement {
    return this.container;
  }

  getElements(): void {
    this.arrowPrev = document.querySelector(
      '.page__arrow--prev'
    ) as HTMLButtonElement;
    this.arrowNext = document.querySelector(
      '.page__arrow--next'
    ) as HTMLButtonElement;
  }

  async setImage(): Promise<void> {
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

  addListeners(): void {
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

  init(): void {
    this.getElements();
    this.setImage();
    this.addListeners();
  }
}
