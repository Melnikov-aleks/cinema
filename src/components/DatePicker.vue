<template>
  <div class="date-picker">
    <elDatePicker
      type="date"
      placeholder="Pick a day"
      v-model="date"
      :picker-options="pickerOptions"
    />
  </div>
</template>

<script>
export default {
  name: 'DatePicker',
  props: {
    dates: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      date: '',
      pickerOptions: {
        disabledDate: (time) =>
          !this.dates.some((date) => time.setHours(0) === date.setHours(0)),
      },
    };
  },
  methods: {},
  watch: {
    date(value) {
      console.log(value);
      this.$emit('DateSelect', value);
    },
  },
};
</script>