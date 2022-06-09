<template>
  <div class="container">
    <div class="logo"></div>
    <NavList></NavList>
  </div>
</template>

<script lang="ts" setup>
import NavList from './components/navList.vue'
</script>

<style scoped lang="scss">
.container {
  @include flex();
  .logo {
    width: 300px;
    height: 60px;
    border: 1px solid red;
  }
}
</style>
