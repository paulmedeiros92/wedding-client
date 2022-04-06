<template>
  <div id="app">
    <Navigation />
    <Landing />
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
import Landing from '@/components/Landing.vue'

export default {
  name: 'App',
  components: {
    Navigation,
    Landing,
  }
}
</script>

<style>
html {
  background-color: black;
}
</style>
