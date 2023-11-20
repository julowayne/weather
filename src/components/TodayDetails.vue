<template>
  <div class="details">
    <div>
      {{ getHours }}
    </div>
    <div>
      {{ weatherToday.temperature }} °c <br />
      {{ weatherToday.condition }}
    </div>
  </div>
</template>

<script lang="ts">
import dayjs, { locale } from 'dayjs'
dayjs.locale('fr')

export default {
  name: 'TodayDetails',

  props: {
    weatherToday: Object
  },

  computed: {
    getHours() {
      return dayjs(this.weatherToday.day).locale('fr').format('HH:mm')
    }
  }
}
</script>

<style scoped>
.details {
  padding: 10px;
}
</style>
