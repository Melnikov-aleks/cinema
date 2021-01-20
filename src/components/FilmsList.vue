<template>
  <div class="films-container">
    <el-carousel
      class="films"
      height="150px"
      :autoplay="false"
      type="card"
      trigger="click"
    >
      <el-carousel-item
        v-for="(film, i) in films"
        :key="i"
        class="films__item film"
        @click.native="selectFilm(i)"
      >
        <h3 class="small">{{ film.title }}</h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'FilmsList',
  props: {
    films: Array,
  },
  methods: {
    selectFilm(i) {
      this.$emit('SelectFilm', i);
    },
  },
};
</script>

<style lang="scss" scoped>
.films__item {
  background-color: #99a9bf;
}
.small {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}
</style>
