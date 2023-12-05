<script lang="ts">
import { RouterView } from 'vue-router'
import Toasters from './components/Toaster.vue';
import DarkMode from './components/DarkMode.vue';

export default {
  components: {
    Toasters,
    DarkMode
  }
}

</script>

<template>
  <header>
    <div class="wrapper">
      <RouterView />
      <DarkMode />
      <Toasters />
    </div>
  </header>
</template>

<style scoped></style>

