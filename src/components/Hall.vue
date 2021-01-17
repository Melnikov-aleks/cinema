<template>
  <div v-show="rows.length" class="hall">
    <ol class="rows__list">
      <li v-for="(row, i) in rows" :key="i" class="rows__item row seats">
        <ul class="seats__list">
          <li
            v-for="(seat, j) in row"
            :key="j"
            class="seats__item"
            @click="selectSeat(i, j, $event)"
            ref="seat"
          >
            seat {{ j }}
          </li>
        </ul>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: 'SeatPicker',
  props: {
    rows: Array,
    seatsBought: Boolean,
  },
  methods: {
    selectSeat(row, seat, e) {
      if (this.rows[row][seat].status === 'reserved') return;
      e.target.classList.toggle('select');
      this.$emit('SeatSelect', { info: this.rows[row][seat], row, seat });
    },
  },
  watch: {
    seatsBought() {
      this.$refs.seat.forEach((ref) => {
        ref.classList.remove('select');
      });
      this.$emit('ClearSelects');
    },
  },
};
</script>

<style lang="scss">
.select {
  opacity: 0.5;
}
</style>