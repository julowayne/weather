<template>
  <div>
    <div class="day">
      <span>
        {{ day }}
      </span>
      <span> {{ weather.temperature }} ° </span>
      <span id="img">
        <img class="weather-icon" v-if="weather" :src="weatherImages" alt="weather image" />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs'

export default {
  name: 'ForecastDay',

  props: {
    weather: Object
  },

  computed: {
    day() {
      return dayjs(this.weather.day).format('dddd MMM')
    },

    weatherImages() {
      const futureWeather = this.weather.weatherCondition.toLowerCase()
      console.log(import.meta.url)
      return new URL(`../assets/${futureWeather}.png`, import.meta.url).href
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
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
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
