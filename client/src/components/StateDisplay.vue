<template>
  <div class="state">
    <div class="status getStatus" v-if="getStatus === 'failed'">
      <span>
        Could not get shopping list 🤔
      </span>
      <small>
        You should probably tell Alex about it...🧐
      </small>
    </div>
    <div class="status addFailed" v-if="addStatus === 'failed'">
      <span>
        Failed to add your entry to the list 🤔
      </span>
      <small>
        You should probably tell Alex about it...🧐
      </small>
    </div>
    <div class="status resetFailed" v-if="resetStatus === 'failed'">
      <span>
        Failed to reset the list 🤔
      </span>
      <small>
        You should probably tell Alex about it...🧐
      </small>
    </div>
    <div class="status commitFailed" v-if="commitStatus === 'failed'">
      <span>
        Failed to commit the list 🤔
      </span>
      <small>
        You should probably tell Alex about it...🧐
      </small>
    </div>
    <div class="status renameStatus" v-if="renameStatus === 'failed'">
      <span>
        Failed to rename the list 🤔
      </span>
      <small>
        You should probably tell Alex about it...🧐
      </small>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      getStatus: state => state.list.getStatus,
      addStatus: state => state.list.addStatus,
      resetStatus: state => state.list.resetStatus,
      commitStatus: state => state.list.commitStatus,
      renameStatus: state => state.list.renameStatus

    }),
  },
}
</script>

<style>

</style>
