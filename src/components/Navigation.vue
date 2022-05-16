<template>
  <div class="navigation">
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
  methods: {
    scrollTo(ref) {
      console.log(ref);
      var top = ref.$el.offsetTop;
      window.scrollTo({ top, left: 0, behavior: "smooth" });
    },
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
}

.navigation__link {
  color: white;
  font-size: 13px;
  text-transform: uppercase;
  font-weight: 600;
  margin: auto 0;
  cursor: pointer;

  .navigation__link-icon {
    margin: 2px 2em;
    font-size: 6px;
    color: #70a076;
  }
}
</style>
