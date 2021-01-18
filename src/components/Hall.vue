<template>
  <div v-show="rows.length" class="hall">
    <ol class="rows__list">
      <li v-for="(row, i) in rows" :key="i" class="rows__item row seats">
        <ul class="seats__list">
          <li
            v-for="(seat, j) in row"
            :key="j"
            :data-row="i"
            :data-seat="j"
            class="seats__item"
            :class="seat.status"
            @click="selectSeat(i, j)"
            ref="seat"
          >
            {{ j }}
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
    selectedSeats: Array,
  },
  methods: {
    selectSeat(row, seat) {
      if (this.rows[row][seat].status === 'reserved') return;
      this.$emit('SeatSelect', { info: this.rows[row][seat], row, seat });
    },
  },
  watch: {
    selectedSeats() {
      if (!this.$refs.seat) return;
      this.$refs.seat.forEach((ref) => {
        ref.classList.remove('select');
        if (
          this.selectedSeats.some(
            (seat) =>
              seat.row === +ref.getAttribute('data-row') &&
              seat.seat === +ref.getAttribute('data-seat')
          )
        )
          ref.classList.add('select');
      });
    },
  },
};
</script>

<style lang="scss">
.select {
  background: burlywood;
}
.reserved {
  opacity: 0.5;
}
.seats__list {
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.seats__item {
  height: 2rem;
  width: 2rem;
  margin: 0.2rem;
  padding: 0;
  line-height: 2rem;
}
</style>