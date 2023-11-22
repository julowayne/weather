<template>
  <div class="weatherToday" @click="showDetails">
    <div id="today">
      <div class="temperature">{{ todayTemperature }} °c</div>
      <div>
        <font-awesome-icon class="fa-2xl" :icon="['fas', weatherIcon]" />
      </div>
    </div>
  </div>
  <div v-if="showWeatherDetails === true">
    <WeatherDayDetails :weatherTodayDetails="weatherTodayDetails" />
  </div>
</template>

<script lang="ts">
import WeatherDayDetails from '@/components/DayDetails.vue'
import { WeatherApi } from '@/services/weather'

import { Dates } from '@/helpers/dates'

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
    hour: {
      type: Date,
      required: true
    },
    condition: {
      type: String,
      required: true
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
      return Dates.getDays(this.hour)
    },

    weatherIcon() {
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

.icon {
  margin-left: 5px;
}

.temperature {
  font-weight: 700;
  font-size: xx-large;
  margin-bottom: 4px;
}

#today {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  min-width: 350px;
  padding: 10px;
  border-radius: 4px;
  background-color: #2c3e50;
  box-shadow: var(--box-shadow);
  color: white;
  font-size: bold;
  cursor: pointer;
}

#today:hover {
  background-color: #17a2b8;
}
</style>
