<template>
  <div class="search-container">
    <div class="search">
      <input
        v-model.trim="searchCity.name"
        type="text"
        @keyup.enter="getWeatherByCity"
        placeholder="Search other cities"
      />
      <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="search-icon fa-l" />
    </div>
    <div v-if="searchCity.temperature !== null">
      The temperature in {{ searchCity.name }} is {{ searchCity.temperature }} °c
    </div>
    <div v-else>
      {{ errorMsg }}
    </div>
  </div>
</template>

<script lang="ts">
import { WeatherApi } from '@/services/weather'

export interface ThreeHoursWeather {
  dateTime: Date
  temperature: number
  trend: string
}

export default {
  name: 'Search',

  data: () => ({
    owApiKey: import.meta.env.VITE_OW_API_KEY,
    searchCity: {
      name: '',
      temperature: null as number | null
    },
    errorMsg: ''
  }),

  methods: {
    async getWeatherByCity() {
      const weather = await WeatherApi.get('forecast', {
        city: this.searchCity.name,
        units: 'metric'
      })

      if (weather === 400) {
        // this.errors = [
        //   {
        //     message: 'Error 400: Bad request'
        //   }
        // ]
      } else if (weather === 401) {
        // this.errors = [
        //   {
        //     message: 'Error 401: Unauthorized request'
        //   }
        // ]
      } else {
        // const fiveDaysForecast: ThreeHoursWeather[] = weather.list.map((range: any) => ({
        //   dateTime: range.dt_txt,
        //   temperature: range.main.temp_max,
        //   trend: range.weather[0].main
        // }))

        // this.searchCity.name = weather.city.name
        // this.todayTemperature = Math.round(weather.list[0].main.temp)
        // this.hour = weather.list[0].dt_txt
        // this.condition = weather.list[0].weather[0].main
        // this.weathers = this.getDaysData(fiveDaysForecast)
        // this.TodayDetails = this.getTodayDetailsData(fiveDaysForecast)
      }
    }
  },

  watch: {
    'searchCity.name'() {
      if (this.searchCity.name === '') this.searchCity.temperature = null
    }
  }
}
</script>

<style scoped>
.search-container {
  width: 100%;
}

input {
  display: inline-block;
  width: 100%;
  height: 50px;
  border-radius: 6px;
  margin-bottom: 15px;
  font-size: larger;
  font-weight: 500;
  padding: 0 35px;
  box-shadow: var(--box-shadow);
  border: none;
  background-color: #e9ecef;
}

input:focus {
  outline: none;
  border: none;
}

input::placeholder {
  color: black;
}

.search {
  position: relative;
}
.search-icon {
  position: absolute;
  left: 10px;
  top: 17px;
}
</style>
