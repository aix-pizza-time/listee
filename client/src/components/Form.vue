<template>
  <form v-on:submit.prevent @submit="add(newEntry)">
    <input
      type="text"
      v-model="newEntry"
      name="entry"
      placeholder="Zutaten, Getränke, persönliche Extrawünsche..."/>
    <button class="addButton" type="button" @click="add(newEntry)">
      <i class="material-icons">
        add_shopping_cart
      </i>
      <span>
        Zur Liste hinzufügen
      </span>
    </button>
    <div class="spacer"></div>
    <div class="flexbox">
      <!-- <button class="commitButton" type="button" @click="commit()">
        <i class="material-icons">
          receipt
        </i>
        <span>
          Finalize List
        </span>
      </button> -->
      <button class="resetButton" type="button" @click="reset()">
        <i class="material-icons">
          delete_outline
        </i>
        <span>
          Liste zurücksetzen
        </span>
      </button>
    </div>
  </form>
</template>

<script>
import { mapState } from 'vuex';
export default {
  components: {
  },
  name: 'Form',
  data: () => {
    return {
      newEntry: '',
      eventDisplay: false,
    };
  },
  computed: {
    ...mapState({
      addStatus: state => state.list.addStatus,
      resetStatus: state => state.list.resetStatus,
      // commitStatus: state => state.list.commitStatus
    }),
  },
  methods: {
    add(entry) {
      this.newEntry = '';
      this.$store.dispatch('list/addEntry', {entry});
    },
    // commit() {
    //   this.$store.dispatch('list/commitList');
    // },
    reset() {
      this.$store.dispatch('list/resetList');
    },
  }
};
</script>

<style lang="scss" scoped>
form {
  padding: 2em 2em 1em;
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;
}
.flexbox {
  display: grid;
  grid-template-columns: 1fr;
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
  font-size: 1em;
  outline: none;
  margin: 16px 0 8px;
  &:active, &:focus {
    border-bottom-color: #424242;
    transition: border-bottom-color linear 0.02s;
  }
}
button.addButton {
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 1.2em;
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
// button.commitButton {
//     font-family: 'IBM Plex Sans', sans-serif;
//     font-size: 1em;
//     background: #242424;
//     color: #ffffff;
//     display: block;
//     width: 100%;
//     border: solid 4px #242424;
//     outline: none;
//     padding: 0.5em 1em;
//     border-radius: 512px;
//     margin: 8px 0 4px;
//     text-transform: uppercase;
//     font-weight: bold;
//     transition: all linear 0.2s;
//     &:active, &:hover {
//       transition: all linear 0.02s;
//       background: #ffffff;
//       color: #242424;
//     }
//     i {
//       vertical-align: middle;
//     }
//     span {
//       vertical-align: middle;
//     }
// }
button.resetButton {
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 1em;
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
button {
  cursor: pointer;
}
</style>
