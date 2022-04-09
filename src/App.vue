<template>
  <div id="app">
    <Navigation />
    <Landing />
    <Details />
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
import Landing from '@/components/Landing.vue'
import Details from '@/components/Details.vue'

export default {
  name: 'App',
  components: {
    Navigation,
    Landing,
    Details,
  }
}
</script>

<style>
body {
  margin: 0;
  font-family: 'Poppins', sans-serif;

}
</style>
