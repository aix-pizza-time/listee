<template>
  <footer>
      Gebaut von <a href="https://git.rwth-aachen.de/zoomoid/" target="_blank">Alexander
      Bartolomey</a> mit viel <span style="color: red">❤️</span> und noch mehr 🍕!
  </footer>
</template>

<script>
export default {
  name: 'Footer'
};
</script>

<style lang="scss" scoped>
footer {
    width: 100%;
    line-height: 2;
    padding: 0.5em;
    text-align: center;
    background: #242424;
    color: #ffffff;
    a {
      color: #ffffff;
    }
}
</style>
