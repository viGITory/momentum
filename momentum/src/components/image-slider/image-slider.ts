import timesOfDay from '../../data/times-of-day';
import getApiData from '../../api/get-api-data';

export default class ImageSlider {
  container: HTMLDivElement;
  arrowPrev!: HTMLButtonElement;
  arrowNext!: HTMLButtonElement;
  image!: HTMLDivElement;

  randomNum: number;

  constructor() {
    this.container = document.createElement('div') as HTMLDivElement;
    this.container.classList.add('image-slider');

    this.randomNum = Math.floor(1 + Math.random() * 19);
  }

  public render(): HTMLDivElement {
    this.container.innerHTML = `
      <div class="image-slider__image"></div>
      <button class="image-slider__arrow image-slider__arrow--prev" type="button">
        <span class="visually-hidden">Prev slide</span>
      </button>
      <button class="image-slider__arrow image-slider__arrow--next" type="button">
        <span class="visually-hidden">Next slide</span>
      </button>
    `;
    return this.container;
  }

  private getElements(): void {
    this.image = this.container.querySelector(
      '.image-slider__image'
    ) as HTMLDivElement;
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

      this.image.style.backgroundImage = `url(${URL.createObjectURL(
        imageData
      )}`;
      this.image.style.opacity = '1';
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
