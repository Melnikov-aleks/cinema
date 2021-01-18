<template>
  <div class="sessions">
    <template v-if="sessions.length">
      <date-picker :dates="getDates()" @DateSelect="selectedDate = $event" />
      <time-picker
        :times="getTimes(selectedDate)"
        @TimeSelect="selectedTime = $event"
      />
      <seat-picker
        :rows="getRows(selectedDate, selectedTime)"
        :selectedSeats="selectedSeats"
        @SeatSelect="addToSelected($event)"
      />
      <basket :selectedSeats="selectedSeats" @SeatsBought="onBought" />
    </template>
  </div>
</template>

<script>
import DatePicker from '@/components/DatePicker.vue';
import TimePicker from '@/components/TimePicker.vue';
import SeatPicker from '@/components/Hall.vue';
import Basket from '@/components/Basket.vue';

export default {
  name: 'SessionsList',
  components: {
    DatePicker,
    TimePicker,
    SeatPicker,
    Basket,
  },
  props: {
    sessions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectedDate: null,
      selectedTime: null,
      selectedSeat: null,
      selectedSeats: [],
    };
  },
  methods: {
    onBought() {
      this.selectedSeats.forEach((el) => {
        /* eslint no-param-reassign: "error" */
        el.info.status = 'reserved';
      });
      this.selectedSeats = [];
    },
    addToSelected(seat) {
      const repeatedIdx = this.selectedSeats.findIndex(
        (el) => el.row === seat.row && el.seat === seat.seat
      );
      if (repeatedIdx !== -1) this.selectedSeats.splice(repeatedIdx, 1);
      else this.selectedSeats.push(seat);
    },
    getDates() {
      return this.sessions.map((obj) => new Date(obj.date));
    },
    getTimes(selectedDate) {
      let times = [];
      this.sessions.forEach((obj) => {
        if (
          new Date(obj.date).toDateString() ===
          new Date(selectedDate).toDateString()
        )
          times = obj.seanses.map((seans) => seans.time);
      });
      return times;
    },
    getRows(date, time) {
      let rows = [];
      this.sessions.forEach((obj) => {
        if (
          new Date(obj.date).toDateString() === new Date(date).toDateString()
        ) {
          obj.seanses.forEach((seans) => {
            if (seans.time === time) rows = seans.rows;
          });
        }
      });
      return rows;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
