<template>
  <div class="navigation animation animation--down" :class="{ fixed: isFixed }">
    <div
      v-for="link of visibleLinks"
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
  name: "Navigation",
  props: {
    refs: Object,
    links: Array,
  },
  data() {
    return {
      observer: null,
      resizeObserver: null,
      topObserver: null,
      isFixed: false,
      isMobile: window.innerWidth <= 600,
    };
  },
  mounted() {
    this.resizeObserver = new ResizeObserver(this.onResize);
    this.resizeObserver.observe(document.body);
    this.observer = new IntersectionObserver(this.onObserved, { threshold: 0 });
    this.observer.observe(this.$el);
    this.topObserver = new IntersectionObserver(this.onTopObserved, {
      threshold: 1,
    });
    this.topObserver.observe(this.refs["home"].$el);
  },
  computed: {
    visibleLinks() {
      if (this.isMobile) {
        return ["home", "details"];
      }
      return this.links;
    },
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
    onResize() {
      this.isMobile = window.innerWidth <= 600;
    },
  },
  beforeUnmount() {
    this.observer.disconnect();
    this.topObserver.disconnect();
    this.resizeObserver.disconnect();
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
  color: #70a076;
  font-size: 13px;
  text-transform: uppercase;
  font-weight: 600;
  margin: auto 0;
  cursor: pointer;
  transition: color 0.25s ease-in;

  &:hover {
    color: #e49497;
  }

  .navigation__link-icon {
    margin: 2px 2em;
    font-size: 6px;
    color: #e49497;

    @media (max-width: 600px) {
      font-size: 12px;
      margin: 2px 1em;
    }
  }

  @media (max-width: 600px) {
    font-size: 24px;
  }
}
</style>
