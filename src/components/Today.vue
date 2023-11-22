<template>
  <div class="Today" @click="showDetails">
    <div id="today">
      <div class="temperature">{{ todayTemperature }} °c</div>
      <div>
        <font-awesome-icon class="fa-2xl" :icon="['fas', weatherIcon]" />
      </div>
    </div>
  </div>
  <div v-if="showWeatherDetails === true">
    <DayDetails :TodayDetails="TodayDetails" />
  </div>
</template>

<script lang="ts">
import DayDetails from '@/components/DayDetails.vue'
import { WeatherApi } from '@/services/weather'

import { Dates } from '@/helpers/dates'

import type { ThreeHoursWeather } from '@/views/Home.vue'
import type { PropType } from 'vue'

export default {
  name: 'Today',
  components: { DayDetails },

  data: () => ({
    showWeatherDetails: false
  }),

  props: {
    city: String,
    hour: {
      type: String,
      required: true
    },
    condition: {
      type: String,
      required: true
    },
    todayTemperature: Number,
    TodayDetails: {
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
.Today {
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
