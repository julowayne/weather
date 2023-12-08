<template>
  <div class="today" @click="showDetails">
    <div id="today">
      <div class="temperature">{{ todayTemperature }}°c</div>
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
.today {
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
  margin-bottom: 5px;
}

#today {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: var(--min-width);
  padding: 10px;
  border-radius: 4px;
  background-color: var(--element-bg-color);
  box-shadow: var(--box-shadow);
  color: var(--white);
  font-size: bold;
  cursor: pointer;
}

#today:hover {
  background-color: #17a2b8;
}
</style>
