<template>
  <div id="app">
    <Navigation :refs="$refs" :links="links" />
    <Landing ref="home" />
    <Details ref="details" />
    <Profile ref="us" />
    <Landscape ref="story" :jumpToRef="$refs['rsvp']" />
    <Story />
    <Gallery ref="gallery" />
    <WeddingParty ref="party" />
    <RSVP ref="rsvp" />
    <Gifts />
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
import Story from "@/components/Story/Story.vue";
import Gifts from "@/components/Gifts.vue";

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
    Story,
    Gifts,
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
  color: #1a1a1a;
  --primary-color: #70a076;
  --accent-color: #e49497;
  --grey-color: #808080;
}

.title {
  margin-bottom: 25px;
  font-family: "Alex Brush", sans-serif;
  color: #1a1a1a;
  font-weight: 400;
  font-size: 50px;
  line-height: 60px;
  text-align: center;
}

.animation {
  animation-name: fadeInUp;
  animation-duration: 700ms;
  animation-delay: 250ms;
  animation-play-state: paused;
  animation-fill-mode: forwards;
  opacity: 0;

  &--down {
    animation-name: fadeInDown;
  }

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

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background-color: transparent;
  transition: background-color 0.2s ease-in;
  border-radius: 10px;

  &:hover {
    background-color: #f1f1f1;
  }
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #777;
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

@keyframes fadeInDown {
  0% {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
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
