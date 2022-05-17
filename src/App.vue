<template>
  <div id="app">
    <Navigation :refs="$refs" :links="links" />
    <Landing ref="home" />
    <Details ref="details" />
    <Profile ref="us" />
    <Landscape ref="story" />
    <Gallery ref="gallery" />
    <WeddingParty ref="party" />
    <RSVP ref="rsvp" />
  </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import Landing from "@/components/Landing.vue";
import Details from "@/components/Details.vue";
import Profile from "@/components/Profile.vue";
import Landscape from "@/components/Landscape.vue";
import Gallery from "@/components/Gallery.vue";
import WeddingParty from "@/components/WeddingParty.vue";
import RSVP from "@/components/RSVP.vue";

export default {
  name: "App",
  components: {
    Navigation,
    Landing,
    Details,
    Profile,
    Landscape,
    Gallery,
    WeddingParty,
    RSVP,
  },
  data() {
    return {
      links: ["home", "details", "us", "story", "gallery", "party"],
    };
  },
};
</script>

<style lang="scss">
@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme(
  "default",
  (
    primary: #70a076,
    // The primary color of your application
    accent: #e49497,
    // The accent or secondary color
    text-primary-on-primary: white,
    text-primary-on-accent: white,
  )
);

@import "~vue-material/dist/theme/all"; // Apply the theme

body {
  margin: 0;
  font-family: "Poppins", sans-serif;
}

.animation {
  animation-name: fadeInUp;
  animation-duration: 700ms;
  animation-delay: 250ms;
  animation-play-state: paused;
  animation-fill-mode: forwards;
  opacity: 0;

  &--left {
    animation-name: fadeInLeft;
  }

  &--right {
    animation-name: fadeInRight;
  }
}

.play-animation {
  animation-play-state: running;
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}

@keyframes fadeInRight {
  0% {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}

@keyframes fadeInLeft {
  0% {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}
</style>
