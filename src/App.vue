<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <FilmsList :films="getFilms()" @SelectFilm="selectedFilmId = $event" />
    <SessionsList :sessions="getSessions()" />
  </div>
</template>

<script>
import FilmsList from '@/components/FilmsList.vue';
import SessionsList from '@/components/Sessions.vue';

export default {
  name: 'App',
  components: {
    FilmsList,
    SessionsList,
  },
  data() {
    return {
      selectedFilmId: null,
      filmList: [
        {
          title: 'TeSt',
          sessions: [
            {
              date: '2021-01-19',
              seanses: [
                {
                  time: '12.00',
                  rows: [
                    [
                      { status: 'free' },
                      { status: 'reserved' },
                      { status: 'reserved' },
                    ],
                    [
                      { status: 'free' },
                      { status: 'reserved' },
                      { status: 'reserved' },
                    ],
                  ],
                },
                {
                  time: '18.00',
                  rows: [
                    [
                      { status: 'free' },
                      { status: 'reserved' },
                      { status: 'reserved' },
                    ],
                    [
                      { status: 'free' },
                      { status: 'reserved' },
                      { status: 'reserved' },
                    ],
                  ],
                },
              ],
            },
            {
              date: '2021-01-17',
              seanses: [
                {
                  time: '10.00',
                  rows: [
                    [
                      { status: 'free' },
                      { status: 'reserved' },
                      { status: 'reserved' },
                    ],
                    [
                      { status: 'free' },
                      { status: 'reserved' },
                      { status: 'reserved' },
                    ],
                    [
                      { status: 'free' },
                      { status: 'reserved' },
                      { status: 'reserved' },
                    ],
                  ],
                },
                {
                  time: '17.00',
                  rows: [
                    [
                      { status: 'free' },
                      { status: 'reserved' },
                      { status: 'reserved' },
                    ],
                    [
                      { status: 'free' },
                      { status: 'reserved' },
                      { status: 'reserved' },
                    ],
                  ],
                },
              ],
            },
          ],
        },
      ],
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
