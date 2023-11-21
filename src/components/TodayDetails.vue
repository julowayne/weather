<template>
  <div class="details">
    <div>
      {{ getHours }}
    </div>
    <div>
      {{ weatherToday.temperature }} °c
    </div>
    <div>
      <font-awesome-icon :icon="['fas', weatherIcon]" />
    </div>
  </div>
</template>

<script lang="ts">

import dayjs from 'dayjs'
dayjs.locale('fr')

import { WeatherApi } from '@/services/weather'
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
    },
    weatherIcon() {
      // const icon = (this.condition ?? '').toLowerCase()
      const icon = this.weatherToday.trend .toLowerCase()

      return WeatherApi.getIcon(icon)
    }
  }
}
</script>

<style scoped>
.details {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}
</style>
