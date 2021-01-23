export default class Sessions {
  constructor(rows, seats) {
    this.data = [];
    this.datesCreate();
    this.seansesCreate(rows, seats);
    return this.data;
  }

  datesCreate() {
    const now = new Date();

    now.setDate(now.getDate() - 11);
    for (let i = 0; i <= 14; i += 1) {
      now.setDate(now.getDate() + 1);
      this.data.push({ date: now.toISOString().slice(0, 10) });
    }
  }

  seansesCreate(rows, seats) {
    this.data.forEach(session => {
      // eslint-disable-next-line no-param-reassign
      session.seanses = [];
      for (let hour = 10; hour <= 20; hour += 2) {
        session.seanses.push({ time: `${hour}.00` });
      }
    });
    this.seatsCreate(rows, seats);
  }

  seatsCreate(rows, seats) {
    this.data.forEach(session => {
      session.seanses.forEach(seans => {
        // eslint-disable-next-line no-param-reassign
        seans.rows = [];
        for (let i = 0; i < rows; i += 1) {
          const row = [];
          for (let seat = 0; seat < seats; seat += 1) {
            row.push({ s: Math.random() < 0.5 ? 'f' : 'r' });
          }
          seans.rows.push(row);
        }
      });
    });
  }
}
