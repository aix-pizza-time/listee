<template>
  <div id="app">
    <Home></Home>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'IBM Plex Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
}
</style>

<script>
import Home from '@/views/Home'

export default {
  components: {
    Home
  }
}
</script>
