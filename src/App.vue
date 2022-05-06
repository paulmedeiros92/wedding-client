<template>
  <div id="app">
    <Navigation />
    <Landing />
    <Details />
    <Profile />
    <Landscape />
    <Gallery />
    <WeddingParty />
    <RSVP />
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';
import Landing from '@/components/Landing.vue';
import Details from '@/components/Details.vue';
import Profile from '@/components/Profile.vue';
import Landscape from '@/components/Landscape.vue';
import Gallery from '@/components/Gallery.vue';
import WeddingParty from '@/components/WeddingParty.vue';
import RSVP from '@/components/RSVP.vue';

export default {
  name: 'App',
  components: {
    Navigation,
    Landing,
    Details,
    Profile,
    Landscape,
    Gallery,
    WeddingParty,
    RSVP,
  }
}
</script>

<style>
body {
  margin: 0;
  font-family: 'Poppins', sans-serif;

}
</style>
