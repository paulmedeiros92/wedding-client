<template>
  <div class="profile">
    <div class="profile__avatar-wrapper">
      <Avatar imgSrc="photos/profile-tori.jpg" />
      <Avatar imgSrc="photos/profile-paul.jpg" :isLeft="false" />
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
    gap: 15vw;

    @media (max-width: 600px) {
      gap: 30vw;
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

    @media (max-width: 600px) {
      flex-flow: column;
      height: 100%;
      margin: 0 auto -35px auto;
    }
  }

  &__succulent {
    width: 100px;
    margin: -17px 15px 0 15px;

    @media (max-width: 600px) {
      margin: 0 auto;
    }
  }
}
</style>
