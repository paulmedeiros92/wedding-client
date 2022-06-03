<template>
  <div class="wedding-party">
    <div class="wedding-party__title animation" ref="title">Wedding Party!</div>
    <div class="wedding-party__nav">
      <div
        v-for="tab of tabs"
        :key="tab"
        :class="['wedding-party__tab', { active: tab === selected }]"
        @click="selected = tab"
      >
        {{ tab }}
      </div>
    </div>
    <div class="wedding-party__gallery animation" ref="gallery">
      <div v-for="person of members[selected]" :key="person.src">
        <Avatar
          :imgSrc="person.src"
          :size="15"
          :title="person.name"
          :hasAnimation="false"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar.vue";
import * as observer from "@/services/observer-service.js";

export default {
  name: "WeddingParty",
  components: {
    Avatar,
  },
  data() {
    return {
      members: {
        groomsmen: [
          { name: "Joseph Guarino", src: "party/joe.webp" },
          { name: "Alexander Hipsher", src: "party/alex.jpg" },
          { name: "Michael Medeiros", src: "party/michael.webp" },
          { name: "Moses Medeiros", src: "party/moses.webp" },
          { name: "David Medeiros", src: "party/david.webp" },
        ],
        bridesmaids: [
          { name: "Debbie Vuong", src: "party/debbie.webp" },
          { name: "Jenny Moran", src: "party/jenny.webp" },
          { name: "Antonio Bass", src: "party/antonio.webp" },
          { name: "Hannah Scarff", src: "party/hannah.webp" },
          { name: "Keala Kieckhafer", src: "party/keala.webp" },
        ],
        staff: [
          { name: "Alexander Hipsher", src: "party/alex.jpg" },
          { name: "Jenny Moran", src: "party/jenny.webp" },
          { name: "Antonio Bass", src: "party/antonio.webp" },
          { name: "Hannah Scarff", src: "party/hannah.webp" },
          { name: "Keala Kieckhafer", src: "party/keala.webp" },
        ],
      },
      observer: null,
      tabs: ["bridesmaids", "groomsmen"],
      selected: "bridesmaids",
    };
  },
  mounted() {
    this.observer = observer.init();
    this.observer.observe(this.$refs.title);
    this.observer.observe(this.$refs.gallery);
    this.selected = this.tabs[Math.floor(Math.random() * this.tabs.length)];
  },
  beforeUnmount() {
    this.observer.disconnect();
  },
};
</script>

<style lang="scss" scoped>
.wedding-party {
  margin-top: 100px;
}
.wedding-party__title {
  font-family: "Alex Brush", sans-serif;
  color: #1a1a1a;
  font-weight: 400;
  font-size: 50px;
  line-height: 60px;
  text-align: center;
}
.wedding-party__nav {
  margin-top: 15px;
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  text-align: center;
  display: flex;
  justify-content: center;
}

.wedding-party__tab {
  padding: 14px 20px;
  color: #808080;
  border: 3px solid rgba(112, 160, 112, 0);
  cursor: pointer;
  transition: border 0.1s ease-in;
  text-transform: uppercase;

  &.active {
    color: #70a070;
    border-bottom: 3px solid rgba(112, 160, 112, 1);
  }
}

.wedding-party__gallery {
  padding-top: 40px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-start;
  margin: 0 5vw 2vw 5vw;
  gap: 3vw;
  overflow-x: hidden;
  scrollbar-width: thin;
}
</style>
