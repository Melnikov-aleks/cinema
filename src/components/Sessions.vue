<template>
  <div class="sessions">
    <template v-if="sessions.length">
      <div class="sessions__aside" :class="AsideClasses()">
        <date-picker
          :dates="getDates()"
          :clear="clear"
          @DateSelect="onSelectDate($event)"
          :class="AsideClasses()"
        />
        <time-picker
          v-if="selectedDate"
          :times="getTimes(selectedDate)"
          :selectedTime="selectedTime"
          @TimeSelect="onSelectTime($event)"
          :class="AsideClasses()"
        />
        <basket
          v-if="selectedTime"
          :selectedSeats="selectedSeats"
          @SeatsBought="onBought"
        />
      </div>
      <transition name="showing">
        <seat-picker
          v-if="selectedTime"
          :rows="getRows(selectedDate, selectedTime)"
          :selectedSeats="selectedSeats"
          @SeatSelect="addToSelected($event)"
        />
      </transition>
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
    AsideClasses() {
      return { moved: this.selectedTime };
    },
    onSelectDate(date) {
      this.selectedDate = date;
    },
    onSelectTime(timeObj) {
      this.selectedTime = timeObj.time;
      this.allowSelect = timeObj.available;
    },
    onBought() {
      this.selectedSeats.forEach((el) => {
        // eslint-disable-next-line no-param-reassign
        el.info.s = 'r';
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
          times = obj.seanses.map((seans) => {
            const timeObj = { time: seans.time };
            let separatedTime = null;
            if (seans.time)
              separatedTime = seans.time.match(/(\d{1,2})\.(\d{1,2})/);
            if (separatedTime) {
              const date = new Date(this.selectedDate);
              date.setHours(separatedTime[1]);
              date.setMinutes(separatedTime[2]);
              timeObj.available = date > Date.now();
            } else timeObj.available = false;
            return timeObj;
          });
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
    selectedTime() {
      this.selectedSeats = [];
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
.sessions {
  display: flex;
  flex-wrap: wrap;
  margin: 1rem 0;
  justify-content: center;
}
.sessions__aside {
  margin: 0 0 0 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
