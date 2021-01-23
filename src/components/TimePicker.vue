<template>
  <div class="times">
    <ul class="times__list">
      <li
        v-for="(timeObj, i) in times"
        class="times__item"
        :class="getClasses(timeObj.time)"
        :key="i"
        @click="selectTime(timeObj)"
      >
        {{ timeObj.time }}
        <span v-if="!timeObj.available" class="times__item-info">архив</span>
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
    selectedTime: String,
  },
  methods: {
    getClasses(time) {
      return { selected: this.selectedTime === time };
    },
    selectTime(timeObj) {
      this.$emit('TimeSelect', timeObj);
    },
  },
};
</script>
<style lang="scss" scoped>
.times {
  margin: 2rem 0;
  min-width: 100%;
}
.times__list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.times__item {
  position: relative;
  padding: 0.5rem 1rem;
  margin: 0;
  text-align: center;
  border-left: 1px solid #000;
  border-bottom: 1px solid #000;
  border-right: 1px solid #000;
  border-radius: 4px;
  cursor: pointer;
  &:first-child {
    border-top: 1px solid #000;
  }
}
.times__item-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
.selected {
  background: #fff;
}
.moved {
  min-width: 0;
  transition: all 1s ease;
  align-self: flex-end;
  .times__item {
    border-right: none;
    border-radius: 4px 0 0 4px;
  }
}
</style>