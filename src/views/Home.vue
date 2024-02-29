<template>
  <div>
    <div v-if="isLoading" class="weather">
      <font-awesome-icon class="fa-5x loader" :class="darkModeClass" :icon="['fas', 'circle-notch']" spin />
    </div>
    <div v-if="!isLoading" class="weather">
      <div class="geolocation" @click="getUserPosition">
        <div>
          <font-awesome-icon :class="darkModeClass" class="fa-2xl fa-flip map" :icon="['fas', 'globe']" />
          <span :class="darkModeClass">Geolocate me</span>
        </div>
        <div>
          <button type="button" class="btn btn-info" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight">historic</button>
          <SideBar />
        </div>
        <div>
          <DarkMode />
        </div>
      </div>
      <div class="container">
        <Search @keyup.enter="getWeatherByCity($event.target.value)" />
      </div>
      <h1 class="weather-title">
        <font-awesome-icon class="location" :class="darkModeClass" :icon="['fas', 'location-dot']" />
        <span :class="darkModeClass">{{ city }}</span>
      </h1>
      <div v-if="isRequestLoading" class="loader-height">
        <font-awesome-icon class="fa-3x loader" :class="darkModeClass" :icon="['fas', 'circle-notch']" spin />
      </div>
      <div v-if="!isRequestLoading">
        <div v-if="todayTemperature !== null && todayTemperature !== undefined && !errors.length" class="container">
          <Today :todayTemperature="todayTemperature" :hour="hour" :condition="condition" :TodayDetails="TodayDetails" />
          <Forecast :weathers="weathers" />
        </div>
      </div>
    </div>
  </div>
  <div class="container" v-if="errors.length">
    <ErrorMessages :errors="errors" />
  </div>
</template>

<script lang="ts">

import { dark } from '@/helpers/dark-toggle'
import { WeatherApi } from '@/services/weather'
import { mapStores } from 'pinia'
import { useToastersStore } from '@/stores/toaster'
import { useDark } from '@vueuse/core'
import Today from '@/components/Today.vue'
import Forecast from '@/components/Forecast.vue'
import ErrorMessages from '@/components/ErrorMessages.vue'
import Search from '@/components/Search.vue'
import DarkMode from '@/components/DarkMode.vue';
import SideBar from '@/components/sideBar.vue'



export interface ThreeHoursWeather {
  dateTime: string
  temperature: number
  trend: string
}


export default {
  name: 'Home',

  components: {
    Today,
    Forecast,
    ErrorMessages,
    Search,
    DarkMode,
    SideBar
  },

  data: () => ({
    owApiKey: import.meta.env.VITE_OW_API_KEY,
    city: '',
    hour: '',
    condition: '',
    todayTemperature: null as number | null,
    latitude: null as number | null,
    longitude: null as number | null,
    weathers: [] as ThreeHoursWeather[],
    TodayDetails: [] as ThreeHoursWeather[],
    weatherBackground: '',
    geolocationDenied: '',
    errors: [] as { message: string }[],
    isLoading: true,
    isRequestLoading: false,
    isDark: useDark({
      selector: 'html',
      attribute: 'class',
      valueDark: 'dark',
      valueLight: 'light',
    }),
  }),

  computed: {
    ...mapStores(useToastersStore),

    darkModeClass() {
      return dark(this.isDark);
    },
  },

  methods: {

    getUserPosition() {
      if (this.errors.length) {
        this.errors = []
      }

      this.loader()

      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }

      const success = (pos: GeolocationPosition) => {
        const crd = pos.coords
        this.latitude = crd.latitude
        this.longitude = crd.longitude

        this.getWeatherData()
      }

      const error = (err: GeolocationPositionError) => {
        console.warn(`ERROR (${err.code}): ${err.message}`)
        this.errors = [
          {
            message:
              'You have to accept geolocation to show the weather \nCheck your navigator settings to accept'
          }
        ]
      }

      navigator.geolocation.getCurrentPosition(success, error, options)
    },

    async getWeatherByCity(city: string) {
      this.isRequestLoading = true
      await this.requestLoader()

      const weather = await WeatherApi.get('forecast', {
        q: city,
        appid: this.owApiKey,
        units: 'metric'
      })

      if (this.errors.length) {
        this.errors = []
      }

      if (weather === 400) {
        this.errors = [
          {
            message: 'Error 400: Bad request'
          }
        ]
      } else if (weather === 401) {
        this.errors = [
          {
            message: 'Error 401: Unauthorized request'
          }
        ]
      } else if (weather === 404) {
        this.errors = [
          {
            message: `The city '${city}' you are looking for doesn't exist`
          }
        ]
      } else {
        const fiveDaysForecast: ThreeHoursWeather[] = weather.list.map((range: any) => ({
          dateTime: range.dt_txt,
          temperature: range.main.temp_max,
          trend: range.weather[0].main
        }))

        this.city = weather.city.name
        this.todayTemperature = Math.round(weather.list[0].main.temp)
        this.hour = weather.list[0].dt_txt
        this.condition = weather.list[0].weather[0].main
        this.weathers = this.getDaysData(fiveDaysForecast)
        this.TodayDetails = this.getTodayDetailsData(fiveDaysForecast)
      }

      this.toastersStore.create({ message: `You were looking for ${city}`, name: "Jules" })

    },

    async getWeatherData() {

      const weather = await WeatherApi.get('forecast', {
        lat: this.latitude,
        lon: this.longitude,
        appid: this.owApiKey,
        units: 'metric'
      })

      if (weather === 400) {
        this.errors = [
          {
            message: 'Error 400: Bad request'
          }
        ]
      } else if (weather === 401) {
        this.errors = [
          {
            message: 'Error 401: Unauthorized request'
          }
        ]
      } else {

        const fiveDaysForecast: ThreeHoursWeather[] = weather.list.map((range: any) => ({
          dateTime: range.dt_txt,
          temperature: range.main.temp_max,
          trend: range.weather[0].main
        }))

        this.city = weather.city.name
        this.todayTemperature = Math.round(weather.list[0].main.temp)
        this.hour = weather.list[0].dt_txt
        this.condition = weather.list[0].weather[0].main
        this.weathers = this.getDaysData(fiveDaysForecast)
        this.TodayDetails = this.getTodayDetailsData(fiveDaysForecast)

      }
    },

    getTodayDetailsData(weatherListDetails: ThreeHoursWeather[]) {
      const nextHours = weatherListDetails.slice(0, 7)

      const dayDetails = nextHours.map((hour) => ({
        dateTime: hour.dateTime,
        temperature: Math.round(hour.temperature),
        trend: hour.trend
      }))

      return dayDetails
    },

    getDaysData(weatherList: ThreeHoursWeather[]) {
      const forecastDays = [7, 15, 23, 31, 39]

      const data = forecastDays.map((forecastDay) => ({
        dateTime: weatherList[forecastDay].dateTime,
        temperature: Math.round(weatherList[forecastDay].temperature),
        trend: weatherList[forecastDay].trend
      }))

      return data
    },

    loader() {
      setTimeout(() => {
        this.isLoading = false
      }, 2000)
    },

    async requestLoader(): Promise<void> {
      await new Promise((resolve) => setTimeout(resolve, 5000))

      this.isRequestLoading = false
    }
  },
  created() {
    this.getUserPosition()
  }
}
</script>

<style scoped>
.map {
  --fa-animation-duration: 3s;
  margin-right: 8px;
}

.weather-title {
  color: #e9ecef;
  padding: 10px;
}

.location {
  margin-bottom: 4px;
  margin-right: 4px;
}

.weather {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: var(--min-width);
}

.geolocation {
  display: flex;
  justify-content: space-between;
  width: 350px;
  padding-bottom: 15px;
  cursor: pointer;
  color: var(--white);
}

.geolocation>span {
  margin-left: 10px;
  font-weight: 700;
}

.loader-height {
  margin-bottom: 20px;
}

.loader {
  color: var(--white);
}

/* Responsive */

@media (min-width: 1024px) {}

@media (max-width: 992px) and (max-width: 1024px) {}

@media (min-width: 768px) and (max-width: 992px) {
  .weather-title {
    font-size: x-large;
  }
}

@media (min-width: 576px) and (max-width: 768px) {
  .weather-title {
    font-size: larger;
  }
}
</style>
