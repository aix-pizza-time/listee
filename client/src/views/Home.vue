<template>
  <div class="home">
    <h1>PizzaBot 🍕🍕</h1>
    <List class="list"></List>
    <Form></Form>
  </div>
</template>

<script>
import List from '@/components/List';
import Form from '@/components/Form';

export default {
  name: 'Home',
  components: {
    List,
    Form,
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
