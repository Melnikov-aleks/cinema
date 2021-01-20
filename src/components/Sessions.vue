<template>
  <div class="sessions">
    <template v-if="sessions.length">
      <date-picker
        :dates="getDates()"
        :clear="clear"
        @DateSelect="onSelectDate($event)"
      />
      <time-picker
        :times="getTimes(selectedDate)"
        @TimeSelect="onSelectTime($event)"
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
      allowSelect: false,
      clear: false,
    };
  },
  methods: {
    onSelectDate(date) {
      this.selectedDate = date;
    },
    onSelectTime(time) {
      this.selectedTime = time;
    },
    onBought() {
      this.selectedSeats.forEach((el) => {
        /* eslint no-param-reassign: "error" */
        el.info.status = 'reserved';
      });
      this.selectedSeats = [];
      this.$emit('Bought');
    },
    addToSelected(seat) {
      if (this.allowSelect) {
        const repeatedIdx = this.selectedSeats.findIndex(
          (el) => el.row === seat.row && el.seat === seat.seat
        );
        if (repeatedIdx !== -1) this.selectedSeats.splice(repeatedIdx, 1);
        else this.selectedSeats.push(seat);
      } else {
        this.selectedSeats = [];
      }
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
  watch: {
    selectedDate() {
      this.selectedSeats = [];
      this.selectedTime = null;
    },
    selectedTime(time) {
      this.selectedSeats = [];
      let separatedTime = null;
      if (time) separatedTime = time.match(/(\d{1,2})\.(\d{1,2})/);
      if (separatedTime) {
        const date = new Date(this.selectedDate);
        date.setHours(separatedTime[1]);
        date.setMinutes(separatedTime[2]);
        this.allowSelect = date > Date.now();
      } else this.allowSelect = false;
    },
    sessions() {
      this.clear = true;
      this.selectedDate = null;
      this.selectedTime = null;
      this.selectedSeat = null;
      this.selectedSeats = [];
      this.$nextTick(() => {
        this.clear = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
