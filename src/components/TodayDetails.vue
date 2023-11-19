<template>
  <div>
    {{ weatherToday.day }} - {{ weatherToday.temperature }} °c - {{ weatherToday.condition }}
  </div>
</template>

<script lang="ts">
export default {
  name: 'TodayDetails',

  props: {
    weatherToday: Object
  }
}
</script>

<style scoped></style>
