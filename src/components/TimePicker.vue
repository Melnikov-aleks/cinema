<template>
  <div class="times">
    <ul class="times__list">
      <li
        v-for="time in times"
        class="times__item"
        :key="time.id"
        @click="$emit('TimeSelect', time)"
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
  methods: {},
};
</script>