export default class Footer {
  constructor() {
    this.container = document.createElement('footer');
    this.container.classList.add('section', 'main-footer');
    this.container.id = 'section-footer';
  }

  render() {
    this.container.innerHTML = `
      <div class="main-footer__left">
        <a class="main-footer__link" href="https://github.com/viGITory" target="_blank" title="“This is the way..” (The Mandalorian)">viGITory</a>
        <time datetime="2021">2021</time>
      </div>
      <a class="main-footer__logo" href="https://rs.school/js" target="_blank">
        <span class="visually-hidden">Rsschool</span>
      </a>
    `;

    return this.container;
  }
}
