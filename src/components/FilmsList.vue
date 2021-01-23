<template>
  <div class="films">
    <el-carousel
      class="films__carousel"
      :autoplay="false"
      :type="carouselType"
      :arrow="carouselArrow"
      indicator-position="outside"
      trigger="click"
      :height="carouselHeight"
    >
      <el-carousel-item
        v-for="(film, i) in films"
        :key="i"
        class="films__item film"
        @click.native="selectFilm(i)"
      >
        <div class="film__wrapper" ref="slideWrapper">
          <el-image
            :src="film.backdrop"
            class="film__backdrop"
            @load="calculateHeight"
            :alt="film.title"
          >
          </el-image>
          <h2 class="film__title">{{ film.title }}</h2>
        </div>
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
  mounted() {
    this.setType();
    window.addEventListener('resize', this.setType);
    window.addEventListener('resize', this.calculateHeight);
  },
  destroyed() {
    window.removeEventListener('resize', this.setType);
    window.removeEventListener('resize', this.calculateHeight);
  },
  data() {
    return {
      carouselType: 'card',
      carouselArrow: 'hover',
      carouselHeight: '200px',
    };
  },
  methods: {
    calculateHeight() {
      if (this.$refs.slideWrapper) {
        this.$refs.slideWrapper.forEach(($img) => {
          if ($img.closest('.is-active')) {
            this.carouselHeight = `${$img.clientHeight}px`;
          }
        });
      } else this.carouselHeight = '400px';
    },
    setType() {
      this.carouselType =
        document.documentElement.clientWidth >= 768 ? 'card' : '';
    },
    selectFilm(i) {
      this.$emit('SelectFilm', i);
    },
  },
  watch: {
    carouselType(value) {
      this.carouselArrow = value === 'card' ? 'hover' : 'always';
    },
  },
};
</script>

<style lang="scss" scoped>
.films {
  width: 100%;
}
.films__carousel {
  width: 100%;
}
.films__item {
  background-color: #99a9bf;
  border-radius: 4px;
}
.film__backdrop {
  width: 100%;
}
.film__title {
  margin: 0;
  width: 100%;
  text-align: center;
}
</style>
