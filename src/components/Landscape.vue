<template>
  <div class="landscape">
    <div class="landscape__story-wrapper">
      <div class="landscape__story-title animation" ref="title">
        We Are Together
      </div>
      <p class="landscape__story-body animation" ref="story">
        Morbi sed magna in neque vestibulum venenatis at eu metus. Mauris
        bibendum nibh eget justo rhoncus, eget vehicula quam condimentum. Etiam
        aliquam vehicula lectus, tempor varius libero.
      </p>
      <div class="animation" ref="button">
        <md-button class="md-primary md-raised" @click="scrollTo"
          >Join Us!</md-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import * as observer from "@/services/observer-service.js";

export default {
  name: "Landscape",
  data() {
    return {
      observer: null,
    };
  },
  mounted() {
    this.observer = observer.init();
    this.observer.observe(this.$refs.title);
    this.observer.observe(this.$refs.story);
    this.observer.observe(this.$refs.button);
  },
  methods: {
    scrollTo() {
      window.scrollTo({
        top: document.body.scrollHeight,
        left: 0,
        behavior: "smooth",
      });
    },
  },
  beforeUnmount() {
    this.observer.disconnect();
  },
};
</script>

<style lang="scss" scoped>
.landscape {
  padding: 160px 0;
  background-image: url("../assets/photos/landscape.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center right;
}

.landscape__story-wrapper {
  padding: 70px 50px;
  background-color: #f7f7f7;
  width: 600px;
  margin-left: 180px;
  text-align: center;
}

.landscape__story-title {
  margin-bottom: 25px;
}

.landscape__story-body {
  margin-bottom: 45px;
}
</style>
