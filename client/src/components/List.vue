<template>
    <div class="list">
      <h2 v-if="Object.keys(this.list).length == 0">Currently no items to be bought 🙄</h2>
      <div v-else>
        <div v-for="(value, key) in list" :key="key" class="list-item">
          <input :value="value" @blur="renameEntry({key,value})" class="label"/>
          <button @click="deleteEntry({key})">
            <i class="material-icons">close</i>
          </button>
        </div>
      </div>
    </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';
// import ListItem from './ListItem';

export default {
  name: 'List',
  components: {
    // ListItem
  },
  computed: {
    ...mapState({
      getStatus: state => state.list.getStatus,
      deleteStatus: state => state.list.deleteStatus,
      renameStatus: state => state.list.renameStatus,
      commitState: state => state.list.commitState,
      resetState: state => state.list.resetState,
      // list: state => state.list.list
    }),
    ...mapGetters('list', {
      list: 'list'
    }),
  },
  methods: mapActions('list', [
    'deleteEntry',
    'renameEntry'
  ]),
  created() {
    this.$store.dispatch('list/getList');
  }
};
</script>

<style lang="scss" scoped>
.list {
  padding: 2em;
  .items {
    // &:not(:last-child) {
      &::after {
        content: ' ';
        display: block;
        width: 80%;
        margin: 0 auto;
        border-bottom: solid 1px #ccc;
      }
    // }
  }
}
.list-item {
  display: flex;
  .label {
    flex-grow: 1;
    font-size: 1.5em;
    font-weight: 700;
    border: none;
    background: none;
    outline: none;
  }
  button {
    background: none;
    border: none;
    outline: none;
    border-radius: 50px;
    height: 48px;
    width: 48px;
    transition: background-color ease-out 0.4s;
    line-height: 1;
    font-size: 1em;
    &:hover, &:active {
      transition: background-color ease-out 0.1s;
      background-color: #ddd;
    }
    i {
      vertical-align: middle;
    }
  }

}
</style>
