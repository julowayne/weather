<script lang="ts">
import { RouterView } from 'vue-router'
import Toasters from './components/Toaster.vue';

export default {
  components: {
    Toasters
  }
}

</script>

<template>
  <header>
    <div class="wrapper">
      <RouterView />
      <Toasters/>
    </div>
  </header>
</template>

<style scoped></style>

