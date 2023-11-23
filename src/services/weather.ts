import axios from 'axios'

export class WeatherApi {
  static instance = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/'
  })

  static async get(path: string, params = {}) {
    try {
      const response = await this.instance.get(path, { params })
      return response.data
    } catch (error: any) {
      if (error.response) {
        return error.response.status
      }
    }
  }

  static getIcon(name: string) {
    switch (name) {
      case 'clouds':
        return 'cloud'

      case 'clear':
      case 'sun':
        return 'sun'

      case 'thunderstorm':
        return 'cloud-bolt'

      case 'rain':
        return 'cloud-showers-heavy'

      default:
        return ''
    }
  }
}
