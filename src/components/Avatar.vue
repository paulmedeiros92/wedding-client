<template>
  <div
    class="avatar animation"
    :class="{ 'animation--left': isLeft, 'animation--right': !isLeft }"
  >
    <div class="avatar__image" :style="style"></div>
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
  },
  data() {
    return {
      style: {},
      observer: null,
    };
  },
  mounted() {
    this.observer = observer.init();
    this.observer.observe(this.$el);
    this.style = {
      "background-image": `url(${require("@/assets/" + this.imgSrc)})`,
    };
  },
  beforeUnmount() {
    this.observer.disconnect();
  },
};
</script>

<style lang="scss" scoped>
.avatar {
  position: relative;
}
.avatar__image {
  overflow: hidden;
  border-radius: 50%;
  height: 350px;
  width: 350px;
  background-size: cover;
}
</style>
