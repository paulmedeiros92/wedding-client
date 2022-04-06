<template>
  <div class="navigation">
    <div v-for="link of links" :key="link" class="navigation__link">
      <span>{{ link }}</span>
      <font-awesome-icon  class="navigation__link-icon" icon="fa-solid fa-heart" />
    </div>
    <div class="navigation__link">RSVP</div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      links: ['home', 'our story', 'when & where', 'our gallery', 'best friends', 'events']
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.navigation {
  width: 100%;
  height: 80px;
  position: static;
  display: flex;
  justify-content: center;
  border-color: rgba(222, 222, 222,0.15);
  border-bottom-width: 1px;
  border-bottom-style: solid;
}

.navigation__link {
  color: white;
  font-family: 'Poppins', sans-serif;
  font-size: 13px;
  text-transform: uppercase;
  font-weight: 600;
  margin: auto 0;

  .navigation__link-icon {
    margin: 2px 2em;
    font-size: 6px;
    color: #70A076;
  }
}
</style>
