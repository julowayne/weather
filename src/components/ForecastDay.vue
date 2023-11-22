<template>
  <div>
    <div class="day">
      <span>
        {{ day }}
      </span>
      <span> {{ weather.temperature }} ° </span>
      <span id="img">
        <font-awesome-icon v-if="weather" :icon="['fas', weatherIcons]" />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { WeatherApi } from '@/services/weather'
import { Dates } from '@/helpers/dates'
import type { ThreeHoursWeather } from '@/views/Home.vue'
import type { PropType } from 'vue'

export default {
  name: 'ForecastDay',
  data: () => ({
    icon: ''
  }),
  props: {
    weather: {
      type: Object as PropType<ThreeHoursWeather>,
      required: true
    }
  },
  computed: {
    day() {
      return Dates.getDays(this.weather.dateTime)
    },

    weatherIcons() {
      const icon = this.weather.trend.toLowerCase()

      return WeatherApi.getIcon(icon)
    }
  }
}
</script>

<style scoped>
.day {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  min-width: 350px;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  background-color: #2c3e50;
  box-shadow: var(--box-shadow);
}

.day:hover {
  background-color: #17a2b8;
}

.day span:first-child {
  text-align: left;
  min-width: 130px;
}

#img {
  text-align: center;
}

.weather-icon {
  width: 50%;
  margin-top: 5px;
}
</style>
