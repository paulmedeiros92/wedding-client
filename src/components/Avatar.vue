<template>
  <div
    class="avatar"
    :class="{
      visible: !hasAnimation,
      animation: hasAnimation,
      'animation--left': hasAnimation && isLeft,
      'animation--right': hasAnimation && !isLeft,
    }"
  >
    <div class="avatar__image" :style="style"></div>
    <div v-if="title" class="avatar__title">{{ title }}</div>
  </div>
</template>

<script>
import * as observer from "@/services/observer-service.js";

export default {
  name: "Avatar",
  props: {
    imgSrc: {
      type: String,
      required: true,
    },
    isLeft: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: "",
    },
    size: {
      type: Number,
      default: 25,
    },
    hasAnimation: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      style: {},
      observer: null,
    };
  },
  mounted() {
    if (this.hasAnimation) {
      this.observer = observer.init();
      this.observer.observe(this.$el);
    }
    this.style = {
      "background-image": `url(${require("@/assets/" + this.imgSrc)})`,
      height: `${this.size}vw`,
      width: `${this.size}vw`,
    };
  },
  beforeUnmount() {
    if (this.hasAnimation) {
      this.observer.disconnect();
    }
  },
};
</script>

<style lang="scss" scoped>
.visible {
  opacity: 1;
}
.avatar {
  position: relative;
  margin: auto;

  &__title {
    font-size: 14px;
    font-weight: 600;
    text-transform: capitalize;
    color: #1a1a1a;
    text-align: center;
    padding: 20px 0;
    @media (max-width: 600px) {
      display: none;
    }
  }
}
.avatar__image {
  overflow: hidden;
  border-radius: 50%;
  background-size: cover;
}
</style>
