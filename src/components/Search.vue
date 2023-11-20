<template>
  <div>
    <input
      v-model.trim="searchCity.name"
      type="text"
      @keyup.enter="getWeatherByCity"
      placeholder="Search other cities"
    />
    <div v-if="searchCity.temperature !== null">
      The temperature in {{ searchCity.name }} is {{ searchCity.temperature }} °c
    </div>
    <div v-else>
      {{ errorMsg }}
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios'

export default {
  name: 'WeatherSearch',

  data: () => ({
    owApiKey: import.meta.env.VITE_OW_API_KEY,
    searchCity: {
      name: '',
      temperature: null as number | null
    },
    errorMsg: ''
  }),

  methods: {
    getWeatherByCity() {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${this.searchCity.name}&appid=${this.owApiKey}&units=metric`
        )
        .then((resp) => {
          this.searchCity.name = resp.data.name
          this.searchCity.temperature = Math.round(resp.data.main.temp)
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 400)
              this.errorMsg = "The city you are looking for doesn't exist"
          }
        })
    },

    async getWeatherByCity2() {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${this.searchCity.name}&appid=${this.owApiKey}&units=metric`
        )

        this.searchCity.name = response.data.name
        this.searchCity.temperature = Math.round(response.data.main.temp)
      } catch (error: any) {
        if (error.response) {
          if (error.response.status === 400)
            this.errorMsg = "The city you are looking for doesn't exist"
        }
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

<style scoped></style>
