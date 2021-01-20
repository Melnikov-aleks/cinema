<template>
  <div id="app">
    <FilmsList :films="getFilms()" @SelectFilm="selectFilm($event)" />
    <SessionsList :sessions="getSessions()" @Bought="onBought" />
  </div>
</template>

<script>
import Timetable from '@/utils/timetableGenerator';

import FilmsList from '@/components/FilmsList.vue';
import SessionsList from '@/components/Sessions.vue';

export default {
  name: 'App',
  components: {
    FilmsList,
    SessionsList,
  },
  async mounted() {
    this.timeTable = await new Timetable().get();
  },
  data() {
    return {
      selectedFilmId: null,
      timeTable: [],
    };
  },
  methods: {
    onBought() {
      localStorage.setItem(
        'timetable',
        JSON.stringify({ timestamp: Date.now(), data: this.timeTable })
      );
    },
    selectFilm(id) {
      this.selectedFilmId = id;
    },
    getFilms() {
      return this.timeTable.map((film) => ({ title: film.title }));
    },
    getSessions() {
      if (this.selectedFilmId === null) return [];
      return this.timeTable[this.selectedFilmId].sessions;
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
