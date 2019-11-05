<template>
  <div id="app">
    <Home class="home"></Home>
    <Footer></Footer>
  </div>
</template>

<style lang="scss">
* {
  box-sizing: border-box;
}
#app {
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 13px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  display: flex;
  flex-direction: column;
  position: absolute;
  min-width: 100%;
  min-height: 100%;
  .home {
    flex-grow: 1;
  }
}
body {
  margin: 0;
  padding: 0;
  min-height: 100%;
  min-width: 100%;
  position: absolute;
}
html {
  height: 100%;
}
</style>

<script>
import Home from '@/views/Home';
import Footer from '@/components/Footer';
export default {
  components: {
    Home,
    Footer
  }
};
</script>
