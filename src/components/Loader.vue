<template>
  <div class="loader">
    <div class="loader__heart" />
    <div class="loader__heart heart2" />
    <div class="loader__heart heart3" />
    <div class="loader__heart heart4" />
    <div class="loader__heart heart5" />
  </div>
</template>

<script>
export default {
  name: "Loader",
};
</script>

<style lang="scss" scoped>
.loader {
  position: relative;
  height: 45px;
  width: 50px;

  &__heart {
    position: absolute;
    width: 50px;
    height: 45px;
    opacity: 0.6;
    animation: loader_beat 3s infinite ease-in-out;

    &:before {
      content: "";
      position: absolute;
      left: 25px;
      top: 0;
      width: 25px;
      height: 40px;
      background-color: #70A076;
      border-radius: 50px 50px 0 0;
      transform: rotate(-45deg);
      transform-origin: 0 100%;
    }

    &:after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 25px;
      height: 40px;
      background-color: #70A076;
      border-radius: 50px 50px 0 0;
      transform: rotate(45deg);
      transform-origin: 100% 100%;
    }

    &.heart2 {
      animation-delay: -1s;
    }
    &.heart3 {
      animation-delay: -1.5s;
    }
    &.heart4 {
      animation-delay: -2s;
    }
    &.heart5 {
      animation-delay: -3s;
    }
  }
}

@keyframes loader_beat {
  0% {
    transform: scale(0.0);
  }
  50% {
    transform: scale(1.0);
  }
  100% {
    transform: scale(0.0);
  }
}
</style>
