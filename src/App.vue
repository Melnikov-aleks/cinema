<template>
  <div id="app">
    <FilmsList :films="getFilms()" @SelectFilm="selectedFilmId = $event" />
    <SessionsList :sessions="getSessions()" />
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
  async created() {
    this.filmList = await Timetable();
  },
  data() {
    return {
      selectedFilmId: null,
      filmList: [],
    };
  },
  methods: {
    getFilms() {
      return this.filmList.map((film) => ({ title: film.title }));
    },
    getSessions() {
      if (this.selectedFilmId === null) return [];
      return this.filmList[this.selectedFilmId].sessions;
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
