<template>
  <div class="profile">
    <div class="title animation" ref="title">Accommodations</div>
    <div class="profile__avatar-wrapper">
      <Avatar imgSrc="photos/profile-tori.webp" />
      <div class="details animation" ref="accommodations">
        <p>
          There are many hotel options located within 15 minutes of
          <a
            target="_blank"
            href="https://www.google.com/maps/place/Northampton+House+-+Weddings+and+Events/@40.3834213,-111.8055761,17z/data=!3m1!4b1!4m5!3m4!1s0x874d810ca93ee429:0xc35afe0c1947a8f2!8m2!3d40.3833936!4d-111.8031206"
            ref="link"
            class="link"
            >Northampton House</a
          >.
        </p>

        <p>
          <a
            target="_blank"
            href="https://www.google.com/maps/place/531+E+Rue+De+Matth,+Vineyard,+UT+84058/@40.297792,-111.7429093,17z/data=!3m1!4b1!4m5!3m4!1s0x874d84b4d507f5a3:0x5f67006ce9414161!8m2!3d40.2977879!4d-111.7407153"
            ref="inn"
            class="inn"
            >We will be staying at a nearby Air B&B</a
          ><br />October 7th we will host a small rehearsal dinner<br />Call us
          when you get here @ 702-328-8639
        </p>
      </div>
      <Avatar imgSrc="photos/profile-paul.webp" :isLeft="false" />
    </div>
    <div class="profile__text animation" ref="names">
      <span class="profile__center">Tori</span>
      <img class="profile__succulent" src="@/assets/succulent.png" />
      <span class="profile__center">Paul</span>
    </div>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar.vue";
import * as observer from "@/services/observer-service.js";

export default {
  name: "Profile",
  components: {
    Avatar,
  },
  data() {
    return {
      observer: null,
    };
  },
  mounted() {
    this.observer = observer.init();
    this.observer.observe(this.$refs.title);
    this.observer.observe(this.$refs.names);
    this.observer.observe(this.$refs.accommodations);
  },
  beforeUnmount() {
    this.observer.disconnect();
  },
};
</script>

<style lang="scss" scoped>
.profile {
  position: relative;
  padding-top: 160px;
  padding-bottom: 100px;

  &__avatar-wrapper {
    display: flex;
    justify-content: center;
    gap: 10vw;
    text-align: center;

    .details {
      display: flex;
      flex-flow: column;
      justify-content: space-around;
      .inn p {
        color: #1a1a1a;
      }
    }

    @media (max-width: 600px) {
      gap: 5vw;
    }
  }

  &__center {
    text-align: center;
  }

  &__text {
    position: absolute;
    bottom: 0;
    width: 100%;
    font-family: "Alex Brush", sans-serif;
    color: #1a1a1a;
    font-weight: 500;
    font-size: 50px;
    line-height: 60px;
    display: flex;
    justify-content: center;
    align-content: center;
  }

  &__succulent {
    width: 100px;
    margin: -17px 15px 0 15px;
  }
}
</style>
