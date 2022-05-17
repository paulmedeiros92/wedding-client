<template>
  <div class="profile">
    <div class="profile__image-wrapper animation animation--left" ref="paul">
      <img class="profile__image paul" src="@/assets/photos/profile-paul.jpg" />
    </div>
    <div class="profile__text animation" ref="names">Paul & Tori</div>
    <div class="profile__image-wrapper animation animation--right" ref="tori">
      <img class="profile__image tori" src="@/assets/photos/profile-tori.jpg" />
    </div>
  </div>
</template>

<script>
import * as observer from "@/services/observer-service.js";

export default {
  name: "Profile",
  data() {
    return {
      observer: null,
    };
  },
  mounted() {
    this.observer = observer.init();
    this.observer.observe(this.$refs.names);
    this.observer.observe(this.$refs.paul);
    this.observer.observe(this.$refs.tori);
  },
  beforeUnmount() {
    this.observer.disconnect();
  },
};
</script>

<style lang="scss" scoped>
.profile {
  display: flex;
  justify-content: center;
  padding-top: 160px;
  padding-bottom: 100px;
}

.profile__image-wrapper {
  overflow: hidden;
  border-radius: 50%;
  height: 350px;
  width: 350px;
}

.profile__image {
  height: 350px;

  &.paul {
    transform: translateX(-13%);
  }

  &.tori {
    transform: translateX(-4%);
  }
}

.profile__text {
  font-family: "Alex Brush", sans-serif;
  color: #1a1a1a;
  font-weight: 500;
  font-size: 50px;
  line-height: 60px;
  margin: auto 80px;
  text-align: center;
  width: 110px;
}
</style>
