<template>
  <div class="details">
    <div>
      {{ getHours }}
    </div>
    <div>
      {{ weatherToday.temperature }} °c <br />
      {{ weatherToday.trend }}
    </div>
  </div>
</template>

<script lang="ts">

import dayjs, { locale } from 'dayjs'
dayjs.locale('fr')

import type { ThreeHoursWeather } from '@/views/Home.vue'
import type { PropType } from 'vue'

export default {
  name: 'TodayDetails',

  props: {
    weatherToday: {
      type: Object as PropType<ThreeHoursWeather>,
      required: true
    }
  },

  computed: {
    getHours() {
      return dayjs(this.weatherToday.dateTime).locale('fr').format('HH:mm')
    }
  }
}
</script>

<style scoped>
.details {
  padding: 10px;
}
</style>
