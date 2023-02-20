<template>
  <div id="app">
    <TextureLoader></TextureLoader>
  </div>
</template>

<script>
import TextureLoader from './components/aoMap/aoMap.vue';
export default {
  name: 'App',
  components: {
    TextureLoader
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
