<template>
  <div class="profile">
    <div class="title">Accommodations</div>
    <div class="profile__avatar-wrapper">
      <Avatar imgSrc="photos/profile-tori.webp" />
      <div class="details">
        <p>
          There are many hotel options located within 15 minutes of
          <a
            target="_blank"
            href="https://www.google.com/maps/place/Northampton+House+-+Weddings+and+Events/@40.3834213,-111.8055761,17z/data=!3m1!4b1!4m5!3m4!1s0x874d810ca93ee429:0xc35afe0c1947a8f2!8m2!3d40.3833936!4d-111.8031206"
            ref="link"
            class="link"
            >Northampton House</a
          >. <strong>We will be staying at:</strong>
        </p>
        <a
          target="_blank"
          href="https://www.google.com/maps/place/3701+N+Ashton+Blvd,+Lehi,+UT+84043/@40.4336761,-111.9058726,15z/data=!4m5!3m4!1s0x87528031bf3ed901:0x43bb2dc91833eff9!8m2!3d40.4334922!4d-111.8968223"
          ref="inn"
          class="inn"
        >
          <p>
            Holiday Inn Express & Suites<br />3701 N. Ashton Blvd.<br />Lehi, UT
            84043
          </p>
        </a>
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
    this.observer.observe(this.$refs.names);
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
