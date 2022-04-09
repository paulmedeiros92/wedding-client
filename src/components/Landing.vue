<template>
  <div class="landing">
    <img class="landing__border" src="@/assets/line_top.png" />
    <div>We Decided To Live Happily Together</div>
    <div class="landing__title">She Said Yes</div>
    <img class="landing__border bottom" src="@/assets/line_top.png" />
  </div>
</template>

<script>
export default {
  name: "Landing",
};
</script>

<style lang="scss" scoped>
.landing {
  color: white;
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-weight: 400;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url('../assets/photos/landing.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}

.bottom {
  transform: rotate(180deg);
}

.landing__title {
  font-size: 110px;
}

.landing__subtext {
  font-size: 26px;
}
</style>
