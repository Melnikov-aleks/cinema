<template>
  <div id="app">
    <FilmsList :films="getFilms()" @SelectFilm="selectFilm($event)" />
    <SessionsList
      :sessions="getSessions()"
      @Bought="onBought"
      v-if="selectedFilmId !== null"
    />
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
      return this.timeTable.map((film) => ({
        title: film.title,
        backdrop: film.backdrop,
      }));
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
  color: #2c3e50;
  background: #f5f7fa;
  min-height: 100vh;
  padding: 0 0 1rem;
}
</style>
