<template>
  <div class="day-details">
    <WeatherTodayDetails
      v-for="(weatherToday, index) in weatherTodayDetails"
      :key="index"
      :weatherToday="weatherToday"
    />
  </div>
</template>

<script lang="ts">
import WeatherTodayDetails from '@/components/TodayDetails.vue'
import type { ThreeHoursWeather } from '@/views/Home.vue'
import type { PropType } from 'vue'

export default {
  name: 'DayDetails',
  props: {
    weatherTodayDetails: {
      type: Array as PropType<ThreeHoursWeather[]>
    }
  },
  components: { WeatherTodayDetails }
}
</script>

<style scoped>
.day-details {
  display: flex;
  flex-direction: row;
  padding: 10px;
  border-radius: 4px;
  width: 350px;
  overflow-x: scroll;
  background-color: #2c3e50;
  box-shadow: var(--box-shadow);
  color: white;
  font-size: bold;
  margin-top: 10px;
}

.day-details::-webkit-scrollbar {
  display: none;
}
</style>
