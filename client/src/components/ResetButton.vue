<template>
  <button>
    <i class="material-icons">
      delete_outline
    </i>
    <span>
      Reset List
    </span>
  </button>
</template>

<script>
export default {
  name: 'ResetButton'
};
</script>

<style lang="scss" scoped>
button {
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 1.5em;
    background: #242424;
    color: #ffffff;
    display: block;
    width: 100%;
    border: solid 4px #242424;
    outline: none;
    padding: 0.5em 1em;
    border-radius: 512px;
    margin: 8px 0 4px;
    text-transform: uppercase;
    font-weight: bold;
    transition: all linear 0.2s;
    &:active, &:hover {
      transition: all linear 0.02s;
      background: #cc0000;
      border-color: #cc0000;
      color: #ffffff;
    }
    i {
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
    }
}
</style>
