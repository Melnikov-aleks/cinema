<template>
  <div v-show="rows.length" class="hall">
    <p class="hall__display">Экран</p>
    <ol class="hall__rows-list">
      <li v-for="(row, i) in rows" :key="i" class="hall__rows-item row">
        <p class="row__num">Ряд {{ i + 1 }}</p>
        <ul class="row__seats-list">
          <li
            v-for="(seat, j) in row"
            :key="j"
            :data-row="i"
            :data-seat="j"
            class="row__seats-item"
            :class="getStatus(seat)"
            @click="selectSeat(i, j)"
            ref="seat"
          ></li>
        </ul>
        <p class="row__num">{{ i + 1 }} Ряд</p>
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
    getStatus(seat) {
      return seat.s === 'r' ? 'reserved' : 'free';
    },
    selectSeat(row, seat) {
      if (this.rows[row][seat].s === 'r') return;
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
.hall {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background: #fff;
}
.hall__display {
  text-align: center;
  width: 80%;
  margin: 0 auto 2rem;
  background: skyblue;
  border: 1px solid rgb(120, 156, 255);
  border-radius: 4px;
  white-space: nowrap;
  overflow: hidden;
}
.hall__rows-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.row {
  display: flex;
  align-items: center;
  justify-content: center;
}
.row__num {
  display: inline-block;
  margin: 0 0.5em;
  font-size: 0.7em;
  white-space: nowrap;
}
.row__seats-list {
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
}
.row__seats-item {
  height: 1em;
  width: 1em;
  margin: 0.2rem;
  padding: 0;
  background: rgb(120, 156, 255);
  border-radius: 4px;
  cursor: pointer;
}
.select {
  background: burlywood;
}
.reserved {
  opacity: 0.5;
  cursor: not-allowed;
}
.showing-enter {
  max-width: 0;
}
.showing-enter-to {
  max-width: 100%;
}
.showing-enter-active {
  transition: all 2s ease;
  overflow: hidden;
}
</style>