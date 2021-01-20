<template>
  <div class="times">
    <ul class="times__list">
      <li
        v-for="(time, i) in times"
        class="times__item"
        :key="i"
        @click="selectTime(time)"
      >
        {{ time }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TimePicker',
  props: {
    times: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    selectTime(time) {
      this.$emit('TimeSelect', time);
    },
  },
};
</script>