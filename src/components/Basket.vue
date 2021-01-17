<template>
  <div class="basket">
    <el-button
      :disabled="!selectedSeats.length"
      type="success"
      class="basket__btn"
      @click="onBuyClick"
      >Купить {{ selectedSeats.length }} билета</el-button
    >
  </div>
</template>

<script>
export default {
  name: 'Basket',
  props: {
    seat: Object,
  },
  data() {
    return {
      selectedSeats: [],
    };
  },
  methods: {
    onBuyClick() {
      this.selectedSeats.forEach((el) => {
        /* eslint no-param-reassign: "error" */
        el.info.status = 'reserved';
      });
      this.selectedSeats = [];
      this.$emit('SeatsBought');
    },
  },
  watch: {
    seat() {
      const repeatedIdx = this.selectedSeats.findIndex(
        (el) => el.row === this.seat.row && el.seat === this.seat.seat
      );
      if (repeatedIdx !== -1) this.selectedSeats.splice(repeatedIdx, 1);
      else this.selectedSeats.push(this.seat);
    },
  },
};
</script>