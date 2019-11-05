<template>
  <form>
    <input type="text" name="entry" placeholder="Ingredient, drinks, random stuff..."/>

    <button>
      <i class="material-icons">
        add_shopping_cart
      </i>
      <span>
        Add to list
      </span>
    </button>
    <div class="spacer"></div>
    <div class="flexbox">
      <CommitButton></CommitButton>
      <ResetButton></ResetButton>
    </div>
  </form>
</template>

<script>
import axios from 'axios';
import {CommitButton, ResetButton} from './';

export default {
  components: {
    CommitButton,
    ResetButton
  },
  name: 'Form',
  methods: {
    add: () => {
      axios.post('http://localhost:3000/api/add');
    }
  }
};
</script>

<style lang="scss" scoped>
form {
  padding: 2em 2em 1em;
}
.flexbox {
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    button {
      font-size: 1em;
    }
  }
  column-gap: 16px;
  font-size: 12px;
  button {
    font-weight: 500;
  }
}
input {
  font-family: 'IBM Plex Sans', sans-serif;
  display: block;
  padding: 8px 12px 4px;
  border: none;
  border-bottom: solid 4px #eee;
  transition: border-bottom-color linear 0.2s;
  width: 100%;
  font-size: 1.5em;
  outline: none;
  margin: 16px 0 8px;
  &:active, &:focus {
    border-bottom-color: #424242;
    transition: border-bottom-color linear 0.02s;
  }
}
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
    margin: 16px 0 4px;
    text-transform: uppercase;
    font-weight: bold;
    transition: all linear 0.2s;
    &:active, &:hover {
      transition: all linear 0.02s;
      background: #ffffff;
      color: #242424;
    }
    i {
      vertical-align: middle;
      font-size: 2em;
      line-height: 1;
    }
    span {
      vertical-align: middle;
    }
}
</style>
