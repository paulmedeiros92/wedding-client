<template>
  <div class="wedding-party">
    <div class="wedding-party__title">Wedding Party!</div>
    <div class="wedding-party__nav">
      <div :class="{'wedding-party__tab': true, 'active': isGroomside }" @click="isGroomside = true">GROOMSMEN</div>
      <div :class="{'wedding-party__tab': true, 'active': !isGroomside }" @click="isGroomside = false">BRIDESMAIDS</div>
    </div>
    <div class="wedding-party__gallery">
      <div v-for="person of people" :key="person.src">
        <div class="wedding-party__portrait">
          <img class="image" :src="person.src"  />
        </div>
        <div class="wedding-party__person-title">{{ person.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WeddingParty",
  data() {
    return {
      groomsParty: [
        { name: "Joseph Guarino", src: require("@/assets/party/alexander.jpg") },
        { name: "Alexander Hipshire", src: require("@/assets/party/victoria.jpg") }
      ],
      bridesParty: [
        { name: "Debbie Yuong", src: require("@/assets/party/victoria.jpg") },
        { name: "Antonio Bass", src: require("@/assets/party/alexander.jpg") }
      ],
      isGroomside: false,
    };
  },
  computed: {
    people() {
      return this.isGroomside ? this.groomsParty : this.bridesParty;
    }
  },
};
</script>

<style lang="scss" scoped>
.wedding-party {
  margin-top: 100px;
}
.wedding-party__title {
  font-family: 'Alex Brush', sans-serif;
  color: #1A1A1A;
  font-weight: 400;
  font-size: 50px;
  line-height: 60px;
  text-align: center;
}
.wedding-party__nav {
  margin-top: 15px;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  text-align: center;
  display: flex;
  justify-content: center;
}

.wedding-party__tab {
  padding: 14px 20px;
  color: #808080; 
  border:  3px solid rgba(112, 160, 112, 0);
  cursor: pointer;
  transition: border 0.1s ease-in;

  &.active {
    color: #70A070;
    border-bottom: 3px solid rgba(112, 160, 112, 1);
  }
}

.wedding-party__gallery {
  margin-top: 40px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: center;
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
