<template>
  <div class="day-details">
    <TodayDetails v-for="(Today, index) in TodayDetails" :key="index" :Today="Today" />
  </div>
</template>

<script lang="ts">
import TodayDetails from '@/components/TodayDetails.vue'
import type { ThreeHoursWeather } from '@/views/Home.vue'
import type { PropType } from 'vue'

export default {
  name: 'DayDetails',
  props: {
    TodayDetails: {
      type: Array as PropType<ThreeHoursWeather[]>
    }
  },
  components: { TodayDetails }
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
