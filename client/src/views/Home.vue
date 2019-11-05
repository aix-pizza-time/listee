<template>
  <div class="home">
    <h1>PizzaBot 🍕🍕</h1>
    <List></List>
  </div>
</template>

<script>
import List from '@/components/List';

export default {
    name: 'Home',
    components: {
        List
    }
};
</script>

<style lang="sass">
h1
  font-size: 3em
</style>
