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
        :seatsBought="this.seatsBought"
        @SeatSelect="selectedSeat = $event"
        @ClearSelects="seatsBought = false"
      />
      <basket :seat="selectedSeat" @SeatsBought="seatsBought = true" />
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
      seatsBought: false,
    };
  },
  methods: {
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
