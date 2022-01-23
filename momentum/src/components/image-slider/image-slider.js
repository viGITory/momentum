import timesOfDay from '../../data/times-of-day';
import getApiData from '../../api/get-api-data';

export default class ImageSlider {
  constructor() {
    this.container = document.createElement('div');
    this.container.classList.add('background');

    this.randomNum = Math.floor(1 + Math.random() * 19);
  }

  getElements() {
    this.arrowPrev = document.querySelector('.page__arrow--prev');
    this.arrowNext = document.querySelector('.page__arrow--next');
  }

  render() {
    return this.container;
  }

  async setImage() {
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

  addListeners() {
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

  init() {
    this.getElements();
    this.setImage();
    this.addListeners();
  }
}
