<script lang="ts">
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
    </div>
    <Toasters />
  </header>
</template>

<style>
.wrapper {
  width: 350px;
}
</style>
