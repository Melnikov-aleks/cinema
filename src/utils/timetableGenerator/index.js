import API, { imageBase } from '@/utils/api';
import Sessions from '@/utils/sessionsGenerator';

export default async function Timetable() {
  const timetable = [];
  const data = await new API().get();
  data.results.forEach(film => {
    timetable.push({ title: film.title, backdrop: imageBase + film.backdrop_path });
  });
  timetable.forEach(film => {
    // eslint-disable-next-line no-param-reassign
    film.sessions = new Sessions(6, 4);
  });
  return timetable;
}
