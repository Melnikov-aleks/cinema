<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <films-list></films-list>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue';
import FilmsList from './components/FilmsList.vue';

export default {
  name: 'App',
  components: {
    // HelloWorld,
    FilmsList,
  },
  data: () => ({
    filmList: [
      {
        name: 'TeSt',
        sessions: [
          {
            date: '17.01.21',
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
            ],
          },
        ],
      },
    ],
  }),
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
