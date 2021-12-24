import ImageSlider from '../image-slider/image-slider';
import DateWidget from '../date/date-widget';
import Quotes from '../quotes/quotes';
import Weather from '../weather/weather';
import AudioPlayer from '../audio-player/audio-player';
import MainFooter from '../main-footer/main-footer';
import Settings from '../settings/settings';

export default class Page {
  constructor() {
    this.container = document.querySelector('.page');

    this.imageSlider = new ImageSlider();
    this.dateWidget = new DateWidget();
    this.quotes = new Quotes();
    this.weather = new Weather();
    this.audioPlayer = new AudioPlayer();
    this.mainFooter = new MainFooter();
    this.settings = new Settings();
  }

  render() {
    this.container.innerHTML = `
      <h1 class="visually-hidden">Momentum</h1>
      <div class="page__top">
        <button class="page__arrow page__arrow--prev" type="button">
          <span class="visually-hidden">Prev slide</span>
        </button>
        <button class="page__arrow page__arrow--next" type="button">
          <span class="visually-hidden">Next slide</span>
        </button>
      </div>
      <div class="page__center"></div>
      <div class="page__bottom"></div>
    `;

    return this.container;
  }

  getElements() {
    this.pageTop = this.container.querySelector('.page__top');
    this.pageCenter = this.container.querySelector('.page__center');
    this.pageBottom = this.container.querySelector('.page__bottom');
  }

  addComponents() {
    this.container.prepend(this.imageSlider.render());
    this.pageTop.append(this.dateWidget.render());
    this.pageTop.append(this.quotes.render());
    this.pageCenter.append(this.weather.render());
    this.pageCenter.append(this.audioPlayer.render());
    this.pageBottom.append(this.settings.render());
    this.pageBottom.append(this.mainFooter.render());
  }

  init() {
    this.render();
    this.getElements();
    this.addComponents();

    this.imageSlider.init();
    this.dateWidget.init();
    this.quotes.init();
    this.weather.init();
    this.audioPlayer.init();
    this.settings.init();
  }
}
