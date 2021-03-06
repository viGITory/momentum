import getDayOfWeek from '../../utils/get-day-week';

export default class Calendar {
  container: HTMLDivElement;

  constructor() {
    this.container = document.createElement('div') as HTMLDivElement;
    this.container.classList.add('date__calendar', 'calendar');
  }

  public render(): HTMLDivElement {
    return this.container;
  }

  private createCalendar(year: number, month: number): void {
    const mon = month;
    const d = new Date(year, mon);

    let table = `
      <table>
      <thead>
        <tr>
          <th>Mo</th>
          <th>Tu</th>
          <th>We</th>
          <th>Th</th>
          <th>Fr</th>
          <th>Sa</th>
          <th>Su</th>
        </tr>
      </thead>
      <tbody>
        <tr>
    `;

    for (let i = 0; i < getDayOfWeek(d); i += 1) {
      table += '<td></td>';
    }

    while (d.getMonth() === mon) {
      if (d.getDate() === new Date().getDate())
        table += `<td style="color: var(--color-light-l);">${d.getDate()}</td>`;
      else table += `<td>${d.getDate()}</td>`;

      if (getDayOfWeek(d) % 7 === 6) table += '</tr><tr>';

      d.setDate(d.getDate() + 1);
    }

    if (getDayOfWeek(d) !== 0) {
      for (let i = getDayOfWeek(d); i < 7; i += 1) {
        table += '<td></td>';
      }
    }

    table += '</tr></tbody></table>';

    this.container.innerHTML = table;
  }

  public init(): void {
    this.createCalendar(new Date().getFullYear(), new Date().getMonth());
  }
}
