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
  background-image: url("../assets/photos/landscape.webp");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center right;
}

.landscape__story-wrapper {
  padding: 3vw 4vw;
  background-color: #f7f7f7;
  max-width: 600px;
  margin: 0 20px 0 180px;
  text-align: center;

  @media (max-width: 600px) {
    margin: 0 20px 0 40px;
  }
}

.landscape__story-title {
  font-family: "Alex Brush", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 50px;
  line-height: 60px;
  margin-bottom: 25px;
}

.landscape__story-body {
  color: #808080;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  line-height: 24px;
  text-transform: none;
  letter-spacing: 0px;
  font-weight: 400;
  margin-bottom: 45px;
}
</style>
