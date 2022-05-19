<template>
  <div class="wedding-party">
    <div class="wedding-party__title animation" ref="title">Wedding Party!</div>
    <div class="wedding-party__nav">
      <div
        :class="{ 'wedding-party__tab': true, active: !isGroomside }"
        @click="isGroomside = false"
      >
        BRIDESMAIDS
      </div>
      <div
        :class="{ 'wedding-party__tab': true, active: isGroomside }"
        @click="isGroomside = true"
      >
        GROOMSMEN
      </div>
    </div>
    <div class="wedding-party__gallery animation" ref="gallery">
      <div v-for="person of people" :key="person.src">
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
      groomsParty: [
        { name: "Joseph Guarino", src: "party/joe.jpg" },
        { name: "Alexander Hipsher", src: "party/alex.jpg" },
        { name: "Michael Medeiros", src: "party/joe.jpg" },
        { name: "Moses Medeiros", src: "party/moses.jpg" },
        { name: "David Medeiros", src: "party/david.jpg" },
      ],
      bridesParty: [
        { name: "Debbie Yuong", src: "party/debbie.jpg" },
        { name: "Jenny Something", src: "party/jenny.png" },
        { name: "Antonio Bass", src: "party/antonio.jpg" },
        { name: "Hannah Something", src: "party/hannah.jpg" },
        { name: "Keala Something", src: "party/joe.jpg" },
      ],
      isGroomside: false,
      observer: null,
    };
  },
  mounted() {
    this.observer = observer.init();
    this.observer.observe(this.$refs.title);
    this.observer.observe(this.$refs.gallery);
  },
  computed: {
    people() {
      return this.isGroomside ? this.groomsParty : this.bridesParty;
    },
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
  overflow-x: scroll;
  scrollbar-width: thin;
}

.wedding-party__portrait {
  margin: 40px 15px 30px 15px;
  height: 270px;
  width: 270px;
  overflow: hidden;
  border-radius: 50%;
  position: relative;

  .image {
    position: absolute;
    height: 270px;
  }
}
</style>
