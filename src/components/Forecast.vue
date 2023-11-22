<template>
  <div id="forecast">
    <h3 id="next-days">Next days</h3>
    <ForecastDay v-for="(weather, index) in weathers" :key="index" :weather="weather" />
  </div>
</template>

<script lang="ts">
import ForecastDay from '@/components/ForecastDay.vue'
import type { ThreeHoursWeather } from '@/views/Home.vue'
import type { PropType } from 'vue'

export default {
  name: 'Forecast',

  components: {
    ForecastDay
  },

  props: {
    weathers: {
      type: Array as PropType<ThreeHoursWeather[]>
    }
  }
}
</script>

<style scoped>
#forecast {
  display: flex;
  flex-flow: column;
  padding: 20px;
  justify-content: center;
  align-items: center;
  color: #e9ecef;
}

#next-days {
  margin-bottom: 15px;
}
</style>
