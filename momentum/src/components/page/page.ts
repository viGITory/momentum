import ImageSlider from '../image-slider/image-slider';
import DateWidget from '../date/date-widget';
import Calendar from '../calendar/calendar';
import Quotes from '../quotes/quotes';
import Weather from '../weather/weather';
import AudioPlayer from '../audio-player/audio-player';
import MainFooter from '../main-footer/main-footer';
import PageSettings from '../page-settings/page-settings';
import TodoList from '../todo-list/todo-list';

export default class Page {
  imageSlider: ImageSlider;
  dateWidget: DateWidget;
  calendar: Calendar;
  quotes: Quotes;
  weather: Weather;
  audioPlayer: AudioPlayer;
  mainFooter: MainFooter;
  pageSettings: PageSettings;
  todoList: TodoList;

  container: HTMLBodyElement;
  pageTop!: HTMLDivElement;
  pageCenter!: HTMLDivElement;
  pageBottom!: HTMLDivElement;

  constructor() {
    this.container = document.querySelector('.page') as HTMLBodyElement;

    this.imageSlider = new ImageSlider();
    this.dateWidget = new DateWidget();
    this.calendar = new Calendar();
    this.quotes = new Quotes();
    this.weather = new Weather();
    this.audioPlayer = new AudioPlayer();
    this.mainFooter = new MainFooter();
    this.pageSettings = new PageSettings();
    this.todoList = new TodoList();
  }

  render(): HTMLBodyElement {
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

  getElements(): void {
    this.pageTop = this.container.querySelector('.page__top') as HTMLDivElement;
    this.pageCenter = this.container.querySelector(
      '.page__center'
    ) as HTMLDivElement;
    this.pageBottom = this.container.querySelector(
      '.page__bottom'
    ) as HTMLDivElement;
  }

  addComponents(): void {
    this.container.prepend(this.imageSlider.render());
    this.pageTop.append(this.dateWidget.render());
    this.pageTop.append(this.quotes.render());
    this.pageCenter.append(this.weather.render());
    this.pageCenter.append(this.audioPlayer.render());
    this.pageBottom.append(this.todoList.render());
    this.pageBottom.append(this.pageSettings.render());
    this.pageBottom.append(this.mainFooter.render());

    this.container
      .querySelector('.date__day-wrapper')
      ?.append(this.calendar.render());
  }

  updateComponents(): void {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    if (
      date.getDate() === 1 &&
      hours % 6 === 0 &&
      minutes === 0 &&
      seconds === 0
    ) {
      this.calendar.init();
    }

    if (hours % 6 === 0 && minutes === 0 && seconds === 0) {
      this.imageSlider.setImage();
    }

    setTimeout(() => this.updateComponents(), 1000);
  }

  init(): void {
    this.render();
    this.getElements();
    this.addComponents();
    this.updateComponents();

    this.imageSlider.init();
    this.dateWidget.init();
    this.calendar.init();
    this.quotes.init();
    this.weather.init();
    this.audioPlayer.init();
    this.pageSettings.init();
    this.todoList.init();
  }
}
