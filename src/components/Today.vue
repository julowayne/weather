<template>
  <div class="weatherToday" @click="showDetails">
    <div id="today">
      <div>{{ getDay }} - {{ getHour }}</div>
      <div>
        {{ city }} {{ todayTemperature }} °c
        <font-awesome-icon :icon="['fas', weatherIcon]" />
      </div>
    </div>
  </div>
  <div v-if="showWeatherDetails === true">
    <WeatherDayDetails :weatherTodayDetails="weatherTodayDetails" />
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import WeatherDayDetails from '@/components/DayDetails.vue'
import { WeatherApi } from '@/services/weather'

import type { ThreeHoursWeather } from '@/views/Home.vue'
import type { PropType } from 'vue'

export default {
  name: 'WeatherToday',
  components: { WeatherDayDetails },

  data: () => ({
    showWeatherDetails: false
  }),

  props: {
    city: String,
    hour: String,
    condition: {
      type: String, 
      required: true, 
    },
    todayTemperature: Number,
    weatherTodayDetails: {
      type: Array as PropType<ThreeHoursWeather[]>
    }
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
      return dayjs().locale('fr').format('HH:mm')
    },

    weatherIcon() {
      // const icon = (this.condition ?? '').toLowerCase()
      const icon = this.condition.toLowerCase()

      return WeatherApi.getIcon(icon)
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
