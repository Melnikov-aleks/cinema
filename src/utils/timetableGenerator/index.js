import API, { imageBase } from '@/utils/api';
import Sessions from '@/utils/sessionsGenerator';

export default class Timetable {
  constructor() {
    this.timetable = [];
  }

  async get() {
    await this.check();
    return this.timetable;
  }

  async check() {
    if (
      !localStorage.getItem('timetable') ||
      Date.now() - JSON.parse(localStorage.getItem('timetable')).timestamp > 86400000
    )
      await this.create();
    else this.timetable = JSON.parse(localStorage.getItem('timetable')).data;
  }

  async create() {
    const response = await new API().get();
    response.results.forEach(film => {
      this.timetable.push({ title: film.title, backdrop: imageBase + film.backdrop_path });
    });
    this.timetable.forEach(film => {
      // eslint-disable-next-line no-param-reassign
      film.sessions = new Sessions(16, 12);
    });
    localStorage.setItem(
      'timetable',
      JSON.stringify({ timestamp: Date.now(), data: this.timetable })
    );
  }
}
