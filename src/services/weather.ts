import axios from 'axios'

export class WeatherApi {
  static instance = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/'
  })

  static async get(path, params = {}) {
    try {
      const response = await this.instance.get(path, { params })
      return response.data
    } catch (error) {
      if (error.response) {
        return error.response.status
      }
    }
  }
}
