<template>
  <div class="navigation animation animation--down" :class="{ fixed: isFixed }">
    <div
      v-for="link of links"
      :key="link"
      class="navigation__link"
      @click="scrollTo(refs[link])"
    >
      <span>{{ link }}</span>
      <font-awesome-icon
        class="navigation__link-icon"
        icon="fa-solid fa-heart"
      />
    </div>
    <div class="navigation__link" @click="scrollTo(refs.rsvp)">RSVP</div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    refs: Object,
    links: Array,
  },
  data() {
    return {
      observer: null,
      topObserver: null,
      isFixed: false,
    };
  },
  mounted() {
    this.observer = new IntersectionObserver(this.onObserved, { threshold: 0 });
    this.observer.observe(this.$el);
    this.topObserver = new IntersectionObserver(this.onTopObserved, {
      threshold: 1,
    });
    this.topObserver.observe(this.refs["home"].$el);
  },
  methods: {
    scrollTo(ref) {
      var top = ref.$el.offsetTop;
      window.scrollTo({ top, left: 0, behavior: "smooth" });
    },
    onObserved(entries) {
      entries.forEach((entry) => {
        if (entry.intersectionRatio === 0) this.isFixed = true;
      });
    },
    onTopObserved(entries) {
      if (entries[0].intersectionRatio <= 0) return;
      entries.forEach(() => (this.isFixed = false));
    },
  },
  beforeUnmount() {
    this.observer.disconnect();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.navigation {
  width: 100%;
  height: 80px;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  border-color: rgba(222, 222, 222, 0.15);
  border-bottom-width: 1px;
  border-bottom-style: solid;
  z-index: 100;
  opacity: 1;
}

.fixed {
  animation-play-state: running;
  position: fixed;
  background-color: white;
  opacity: 0;

  .navigation__link {
    color: #282828;
  }
}

.navigation__link {
  color: white;
  font-size: 13px;
  text-transform: uppercase;
  font-weight: 600;
  margin: auto 0;
  cursor: pointer;
  transition: color 0.25s ease-in;

  &:hover {
    color: #70a076;
  }

  .navigation__link-icon {
    margin: 2px 2em;
    font-size: 6px;
    color: #70a076;
  }
}
</style>
