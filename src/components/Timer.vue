<template>
  <div class="timer">
    <div class="timer__number">{{ displayNumber }}</div>
    <div class="timer__label">{{ label }}</div>
  </div>
</template>

<script>
export default {
  name: "Details",
  props: {
    number: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  computed: {
    displayNumber() {
      if (this.number > 9) return this.number.toString();
      return `0${this.number}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.timer {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  padding: 25px;
  margin: 25px 15px 0 15px;
  background-color: white;

  @media (max-width: 600px) {
    padding: 15px;
    margin: 25px 5px 0 5px;
  }
}

.timer__number {
  color: #70a076;
  font-weight: 400;
  font-size: 35px;
  line-height: 100%;
}

.timer__label {
  color: #282828;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
}
</style>
