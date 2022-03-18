export default class MainFooter {
  public static render(): string {
    return `
      <footer class="section main-footer" id="section-footer">
        <div class="main-footer__left">
          <a class="main-footer__link" href="https://github.com/viGITory" target="_blank" rel="noopener noreferrer" title="“This is the way..” (The Mandalorian)">viGITory</a>
          <time datetime="2021">2021</time>
        </div>
        <a class="main-footer__logo" href="https://rs.school/js" target="_blank" rel="noopener noreferrer">
          <span class="visually-hidden">Rsschool</span>
        </a>
      </footer>
    `;
  }
}
