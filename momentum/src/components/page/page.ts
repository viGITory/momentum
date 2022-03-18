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
  private static container = document.querySelector('#root') as HTMLBodyElement;

  imageSlider: ImageSlider;
  dateWidget: DateWidget;
  calendar: Calendar;
  quotes: Quotes;
  weather: Weather;
  audioPlayer: AudioPlayer;
  pageSettings: PageSettings;
  todoList: TodoList;

  pageTop!: HTMLDivElement;
  pageCenter!: HTMLDivElement;
  pageBottom!: HTMLDivElement;

  constructor() {
    this.imageSlider = new ImageSlider();
    this.dateWidget = new DateWidget();
    this.calendar = new Calendar();
    this.quotes = new Quotes();
    this.weather = new Weather();
    this.audioPlayer = new AudioPlayer();
    this.pageSettings = new PageSettings();
    this.todoList = new TodoList();
  }

  private render(): HTMLBodyElement {
    Page.container.innerHTML = `
      <div class="page__inner">
        <h1 class="visually-hidden">Momentum</h1>
        <div class="page__top"></div>
        <div class="page__center"></div>
        <div class="page__bottom">
          ${MainFooter.render()}
        </div>
      </div>
    `;

    return Page.container;
  }

  private getElements(): void {
    this.pageTop = Page.container.querySelector('.page__top') as HTMLDivElement;
    this.pageCenter = Page.container.querySelector(
      '.page__center'
    ) as HTMLDivElement;
    this.pageBottom = Page.container.querySelector(
      '.page__bottom'
    ) as HTMLDivElement;
  }

  private addComponents(): void {
    Page.container.prepend(this.imageSlider.render());
    this.pageTop.append(this.dateWidget.render());
    this.pageTop.append(this.quotes.render());
    this.pageCenter.append(this.weather.render());
    this.pageCenter.append(this.audioPlayer.render());
    this.pageBottom.prepend(this.todoList.render());
    this.pageBottom.prepend(this.pageSettings.render());

    Page.container
      .querySelector('.date__day-wrapper')
      ?.append(this.calendar.render());
  }

  private updateComponents(): void {
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

  public init(): void {
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
