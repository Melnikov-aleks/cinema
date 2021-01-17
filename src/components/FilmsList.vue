<template>
  <div class="films">
    <ul class="films__list">
      <li
        v-for="(film, i) in films"
        :key="i"
        @click="selectFilm(i)"
        class="films__item film"
      >
        <h2 class="film__title">{{ film.title }}</h2>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'FilmsList',
  props: {
    films: Array,
  },
  data() {
    return {
      test1: { one: 1 },
    };
  },
  methods: {
    selectFilm(i) {
      this.$emit('SelectFilm', i);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
