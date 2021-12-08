import getImage from '../../api/image-api';

export default class ImageSlider {
  constructor() {
    this.page = document.querySelector('.page');
    this.arrowPrev = document.querySelector('.page__arrow--prev');
    this.arrowNext = document.querySelector('.page__arrow--next');

    this.randomNum = Math.floor(1 + Math.random() * 19);
  }

  async setImage() {
    const timesArr = ['night', 'morning', 'afternoon', 'evening'];
    const timeOfDay = timesArr[Math.floor(new Date().getHours() / 6)];

    if (this.randomNum < 10) {
      this.randomNum = `0${this.randomNum}`;
    }

    try {
      const imageData = await getImage(timeOfDay, this.randomNum);

      this.page.style.backgroundImage = `url(${URL.createObjectURL(imageData)}`;
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
    this.setImage();
    this.addListeners();
  }
}
