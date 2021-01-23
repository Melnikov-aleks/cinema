<template>
  <div class="basket">
    <el-button
      :disabled="!selectedSeats.length"
      type="success"
      class="basket__btn"
      @click="onBuyClick"
      >Забронировать {{ selectedSeats.length }} билет{{ getEndings }}</el-button
    >
  </div>
</template>

<script>
export default {
  name: 'Basket',
  props: {
    selectedSeats: Array,
  },
  methods: {
    onBuyClick() {
      this.$emit('SeatsBought');
    },
  },
  computed: {
    getEndings() {
      let ending = '';
      const numPreEnd = Math.floor(this.selectedSeats.length / 10) % 10;
      const numEnd = this.selectedSeats.length % 10;
      if (numPreEnd !== 1) {
        if (numEnd > 1 && numEnd < 5) ending = 'а';
        else if (numEnd !== 1) ending = 'ов';
      } else ending = 'ов';
      return ending;
    },
  },
};
</script>
<style lang="scss" scoped>
.basket {
  margin: 1rem 0;
}
</style>