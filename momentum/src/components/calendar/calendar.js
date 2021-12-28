export default class Calendar {
  constructor() {
    this.container = document.createElement('div');
    this.container.classList.add('date__calendar', 'calendar');
  }

  render() {
    return this.container;
  }

  createCalendar(year, month) {
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

    for (let i = 0; i < this.getDay(d); i += 1) {
      table += '<td></td>';
    }

    while (d.getMonth() === mon) {
      table += `<td>${d.getDate()}</td>`;

      if (this.getDay(d) % 7 === 6) table += '</tr><tr>';

      d.setDate(d.getDate() + 1);
    }

    if (this.getDay(d) !== 0) {
      for (let i = this.getDay(d); i < 7; i += 1) {
        table += '<td></td>';
      }
    }

    table += '</tr></tbody></table>';

    this.container.innerHTML = table;
  }

  getDay(date) {
    let day = date.getDay();

    if (day === 0) day = 7;

    return day - 1;
  }

  init() {
    this.createCalendar(new Date().getFullYear(), new Date().getMonth());
  }
}
