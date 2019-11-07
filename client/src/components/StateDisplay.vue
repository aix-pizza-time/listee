<template>
  <div class="state" v-if="this.display">
    <div class="status getStatus" v-if="this.getStatus === 'failed'">
      <span>
        Could not get shopping list 🤔
      </span>
      <small>
        You should probably tell us...🧐
      </small>
    </div>
    <div class="status addFailed" v-if="this.addStatus === 'failed'">
      <span>
        Failed to add your entry to the list 🤔
      </span>
      <small>
        You should probably tell us...🧐
      </small>
    </div>
    <div class="status resetFailed" v-if="this.resetStatus === 'failed'">
      <span>
        Failed to reset the list 🤔
      </span>
      <small>
        You should probably tell us...🧐
      </small>
    </div>
    <div class="status commitFailed" v-if="this.commitStatus === 'failed'">
      <span>
        Failed to commit the list 🤔
      </span>
      <small>
        You should probably tell us...🧐
      </small>
    </div>
    <div class="status renameStatus" v-if="this.renameStatus === 'failed'">
      <span>
        Failed to rename the list 🤔
      </span>
      <small>
        You should probably tell us...🧐
      </small>
    </div>
    <button @click="close()">
      <i class=material-icons>close</i>
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'StateDisplay',
  computed: {
    ...mapState({
      getStatus: state => state.list.getStatus,
      addStatus: state => state.list.addStatus,
      resetStatus: state => state.list.resetStatus,
      commitStatus: state => state.list.commitStatus,
      renameStatus: state => state.list.renameStatus
    }),
  },
  data: () => {
    return {
      display: true
    }
  },
  methods: {
    close(){
      this.display = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.state {
  display: flex;
  align-items: center;
  padding: 1em;
  width: 100%;
  background: #cc0000;
  color: #ffffff;
  animation-name: fade-in;
  animation-duration: 2s;
  animation-iteration-count: 1;
  animation-timing-function: ease;
  .status {
    flex-grow: 1
  }
  span {
    display: block;
    font-size: 1rem;
    line-height: 1.5;
  }
  small {
    display: block;
  }
  button {
    background: none;
    border: none;
    outline: none;
    border-radius: 50px;
    height: 32px;
    width: 32px;
    transition: background-color ease-out 0.4s;
    line-height: 1;
    font-size: 1em;
    padding: 0;
    &:hover, &:active {
      transition: background-color ease-out 0.1s;
      background-color: #aa0000;
    }
    i {
      text-align: center;
      color: #ffffff;
      font-size: 24px;
      line-height: 1;
      vertical-align: middle;
    }
  }
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
