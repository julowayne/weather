<template>
  <div class="content-padding">
    <div class="weather">
      <h1 class="weather-title">Weather</h1>
      <div v-if="todayTemperature && !errors.length" class="container">
        <WeatherToday
          :todayTemperature="todayTemperature"
          :city="city"
          :hour="hour"
          :condition="condition"
          :weatherTodayDetails="weatherTodayDetails"
        />
        <WeatherForecast :weathers="weathers" />
      </div>
    </div>
    <div v-if="errors.length">
      <ErrorMessages :errors="errors" />
    </div>
  </div>
</template>

<script lang="ts">
import { WeatherApi } from '@/services/weather'
import WeatherToday from '@/components/Today.vue'
import WeatherForecast from '@/components/Forecast.vue'
import ErrorMessages from '@/components/ErrorMessages.vue'

interface Weather {
  day: string
  temperature: number
  weatherCondition: string
}

export default {
  name: 'Home',

  components: {
    WeatherToday,
    WeatherForecast,
    ErrorMessages
  },

  data: () => ({
    owApiKey: import.meta.env.VITE_OW_API_KEY,
    city: '',
    hour: '',
    condition: '',
    todayTemperature: null as number | null,
    latitude: null as number | null,
    longitude: null as number | null,
    weathers: [] as Weather[],
    weatherTodayDetails: [] as Weather[],
    weatherBackground: '',
    geolocationDenied: '',
    errors: [] as { message: string }[]
  }),

  methods: {
    getUserPosition() {
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
        this.city = weather.city.name
        this.todayTemperature = Math.round(weather.list[0].main.temp)
        this.hour = weather.list[0].dt_txt
        this.condition = weather.list[0].weather[0].main
        this.weathers = this.getDaysData(weather.list)
        this.weatherTodayDetails = this.getTodayDetailsData(weather.list)
        // Ecremer les données reçues par l'api
      }
    },

    // Preciser le type de données dans le tableau
    getTodayDetailsData(weatherListDetails: []) {
      // TODO afficher les détails des 24 prochaines heures
      const nextHours = weatherListDetails.slice(0, 9)

      const dayDetails = nextHours.map((hour) => ({
        day: hour.dt_txt,
        temperature: Math.round(hour.main.temp_max),
        weatherCondition: hour.weather[0].main
      }))

      return dayDetails
    },

    getDaysData(weatherList: []) {
      const forecastDays = [7, 15, 23, 31, 39]
      const data = forecastDays.map((forecastDay) => ({
        day: weatherList[forecastDay].dt_txt,
        temperature: Math.round(weatherList[forecastDay].main.temp_max),
        weatherCondition: weatherList[forecastDay].weather[0].main
      }))

      return data
    }
  },

  created() {
    this.getUserPosition()
  }
}
</script>

<style scoped>
.weather-title {
  color: #e9ecef;
  padding: 10px;
}
.weather {
  width: 80vw;
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
  min-width: 350px;
}
</style>
