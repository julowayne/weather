<template>
  <div class="weatherToday" @click="showDetails">
    <div id="today">
      <div>{{ getDay }} - {{ getHour }}</div>
      <div>{{ city }} {{ todayTemperature }} °c</div>
    </div>
  </div>
  <div v-if="showWeatherDetails === true">
    <WeatherDayDetails :weatherTodayDetails="weatherTodayDetails" />
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import WeatherDayDetails from '@/components/DayDetails.vue'

export default {
  name: 'WeatherToday',
  components: { WeatherDayDetails },
  data: () => ({
    showWeatherDetails: false
  }),
  props: {
    city: String,
    hour: String,
    todayTemperature: Number,
    weatherTodayDetails: Array
  },
  methods: {
    showDetails() {
      this.showWeatherDetails = !this.showWeatherDetails
    }
  },
  computed: {
    getDay() {
      return dayjs(this.hour).format('MMMM DD')
    },
    getHour() {
      return dayjs().hour(12).format('hh:mm a')
    }
  }
}
</script>

<style scoped>
.weatherToday {
  display: flex;
  justify-content: center;
  height: 80px;
}

#today {
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

#today:hover {
  background-color: #17a2b8;
}
</style>
