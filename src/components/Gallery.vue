<template>
  <div class="gallery">
    <div class="gallery-title animation" ref="title">Best Moments</div>
    <div class="gallery__viewer">
      <div class="gallery__arrow" @click="changeIndex(1)">
        <md-icon style="color: white">chevron_right</md-icon>
      </div>
      <div class="gallery__arrow left" @click="changeIndex(-1)">
        <md-icon style="color: white">chevron_left</md-icon>
      </div>
      <div
        v-for="image of images"
        :key="image.src"
        :class="['gallery__image', image.positionClass]"
        :style="{
          'background-image': `url(${require('@/assets/gallery/' +
            image.src)})`,
        }"
      ></div>
      <div class="dot-wrapper">
        <div
          v-for="(image, index) of images"
          :key="image.src + 'dot'"
          :class="['dot', { selected: visibleIndex === index }]"
          @click="visibleIndex = index"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as observer from "@/services/observer-service.js";

export default {
  name: "Gallery",
  data() {
    return {
      imageSources: require
        .context("@/assets/gallery", true, /^.*\.webp$/)
        .keys()
        .map((src) => src.split("./")[1]),
      visibleIndex: 0,
      observer: null,
      interval: null,
    };
  },
  mounted() {
    this.observer = observer.init();
    this.observer.observe(this.$refs.title);
  },
  computed: {
    images() {
      return this.imageSources.map((src, index) => ({
        src,
        positionClass: this.visibleIndex === index ? "center" : "right",
      }));
    },
  },
  methods: {
    getImgUrl(image) {
      return require(`@/assets/gallery/${image.split("./")[1]}`);
    },
    changeIndex(amount) {
      const offset = (this.visibleIndex + amount) % this.imageSources.length;
      if (offset < 0) {
        this.visibleIndex = this.imageSources.length + offset;
      } else {
        this.visibleIndex = offset;
      }
    },
  },
  watch: {
    index: {
      handler() {
        clearInterval(this.interval);
        this.interval = setInterval(
          () =>
            (this.visibleIndex = (this.visibleIndex + 1) % this.images.length),
          5000
        );
      },
      immediate: true,
    },
  },
  beforeUnmount() {
    this.observer.disconnect();
    clearInterval(this.interval);
  },
};
</script>

<style lang="scss" scoped>
.gallery {
  padding: 100px 0;
  background-image: url("../assets/gallery.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  text-align: center;
}

.gallery-title {
  font-family: "Alex Brush", sans-serif;
  color: #1a1a1a;
  font-weight: 400;
  font-size: 50px;
  line-height: 60px;
}

.gallery__viewer {
  display: flex;
  height: 600px;
  width: 800px;
  margin: auto;
  overflow: hidden;
  position: relative;
  margin-top: 40px;

  @media (max-width: 800px) {
    height: 400px;
    width: 100%;
  }
}

.gallery__image {
  position: absolute;
  top: 0;
  left: 400px;
  margin: 0 auto;
  height: 600px;
  width: 100%;
  transition: transform 0.5s ease-in;
  transform: translateX(-50%);
  border-radius: 10px;
  background-size: cover;
  background-position: center;

  @media (max-width: 800px) {
    left: 50%;
    height: 400px;
  }
}

.gallery__arrow {
  position: absolute;
  right: 5px;
  top: calc(50% - 15px);
  border-radius: 50%;
  height: 30px;
  width: 30px;
  padding: 3px;
  z-index: 99;
  transition: background-color 0.2s ease-in;

  &.left {
    left: 5px;
  }

  &:hover {
    background-color: rgba(238, 238, 238, 0.4);
  }
}

.right {
  transform: translateX(800px);
}

.dot-wrapper {
  display: flex;
  position: absolute;
  bottom: 0;
  width: 100%;
  justify-content: center;
}

.dot {
  background-color: white;
  height: 2vw;
  width: 2vw;
  border-radius: 50%;
  z-index: 99;
  margin: 0 1vw 20px 1vw;
  cursor: pointer;

  &.selected {
    background-color: #70a070;
  }
}
</style>
