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
    selectedSeats: Array,
  },
  methods: {
    onBuyClick() {
      this.$emit('SeatsBought');
    },
  },
};
</script>