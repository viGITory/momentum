export default class MainFooter {
  public static render(): string {
    return `
      <footer class="section main-footer" id="section-footer">
        <a class="main-footer__link" href="https://github.com/viGITory" target="_blank" rel="noopener noreferrer" title="“This is the way..” (The Mandalorian)">viGITory</a>
        <div>
          <time datetime="2021">2021 /</time>
          <a class="main-footer__link" href="https://rs.school/js" target="_blank" rel="noopener noreferrer">RSSchool</a>
        </div>
      </footer>
    `;
  }
}
