<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import MainHeader from './components/MainHeader.vue'
</script>

<template>
  <header>
    <MainHeader />
  </header>

  <RouterView />
</template>

<style scoped>
</style>
