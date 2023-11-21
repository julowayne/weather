<template>
  <div class="container">
    <div class="error">
      <font-awesome-icon icon="fa-solid fa-circle-exclamation" id="icon" />
      {{ errors[0].message }}
    </div>
  </div>
</template>

<script lang="ts">

import type { PropType } from 'vue'

export default {
  name: 'ErrorMessages',

  props :{
    errors: {
      type: Array as PropType<{ message: string }[]>,
      required: true
    }
  }
}
</script>

<style scoped>
.error {
  min-width: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  white-space: pre-wrap;
  background-color: #dc3545;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  color: white;
  font-size: larger;
}
#icon {
  /* margin-top: 2px; */
  margin-right: 5px;
}
</style>
