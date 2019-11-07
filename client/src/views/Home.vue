<template>
  <div class="home">
    <StateDisplay></StateDisplay>
    <h1>PizzaBot 🍕🍷</h1>
    <List class="list"></List>
    <Form></Form>
  </div>
</template>

<script>
import List from '@/components/List';
import Form from '@/components/Form';
import StateDisplay from '@/components/StateDisplay';

export default {
  name: 'Home',
  components: {
    List,
    Form,
    StateDisplay
  }
};
</script>

<style lang="scss">
h1 {
  font-size: 3em;
}
.home {
  display: flex;
  flex-direction: column;
}

.list {
  flex-grow: 1;
}
</style>
