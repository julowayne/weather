<template>
  <div id="forecast">
    <h3 id="next-days" :class="darkModeClass">Next days</h3>
    <ForecastDay v-for="(weather, index) in weathers" :key="index" :weather="weather" />
  </div>
</template>

<script lang="ts">
import ForecastDay from '@/components/ForecastDay.vue'
import { useDark } from '@vueuse/core'
import { dark } from '@/helpers/dark-toggle'
import type { ThreeHoursWeather } from '@/views/Home.vue'
import type { PropType } from 'vue'

export default {
  name: 'Forecast',

  data: () => ({
    isDark: useDark({
      selector: 'html',
      attribute: 'class',
      valueDark: 'dark',
      valueLight: 'light',
    }),
  }),

  components: {
    ForecastDay
  },

  props: {
    weathers: {
      type: Array as PropType<ThreeHoursWeather[]>
    }
  },

  computed: {
    darkModeClass() {
      return dark(this.isDark);
    },
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
  font-size: x-large;
}
</style>
