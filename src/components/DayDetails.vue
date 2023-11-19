<template>
  <div>
    <WeatherTodayDetails
      v-for="(weatherToday, index) in weatherTodayDetails"
      :key="index"
      :weatherToday="weatherToday"
    />
  </div>
</template>

<script lang="ts">
import WeatherTodayDetails from '@/components/TodayDetails.vue'

export default {
  name: 'DayDetails',
  props: {
    weatherTodayDetails: Array
  },
  components: { WeatherTodayDetails }
}
</script>

<style scoped>
.details {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  min-width: 350px;
  padding: 10px;
  border-radius: 4px;
  background-color: #2c3e50;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  color: white;
  font-size: bold;
  cursor: pointer;
}
</style>
