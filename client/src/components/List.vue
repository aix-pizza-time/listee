<template>
  <div class="list">
    <h2 class="failed" v-if="getStatus === 'failed'">
      <span>Failed to load list 😤</span>
      <small>We are working on a solution as quick as possible 👨‍💻</small>
    </h2>
    <div v-else>
      <h2 v-if="this.list.length == 0">Currently no items to be bought 🙄</h2>
      <div v-else>
        <div v-for="item in list" :key="item.id" class="list-item">
          <input :value="item.entry" :id="item.id" @blur="renameEntry" class="label" />
          <button @click="deleteEntry(item.id)">
            <i class="material-icons">close</i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'List',
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
  data: () => {
    return {
      privList: {}
    }
  },
  methods: {
    deleteEntry(id){
      this.$store.dispatch('list/deleteEntry', {id});
    },
    renameEntry(e){
      // console.log(name);
      let id = e.target.id;
      let entry = e.target.value;
      this.$store.dispatch('list/renameEntry', {id, entry});
    }
  },
  created() {
    this.$store.dispatch('list/getList');
  }
};
</script>

<style lang="scss" scoped>
.list {
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;
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
.failed {
  span {
    display: block;
  }
  small {
    display: block;
  }
}
</style>
