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

  static getIcon(name: string){
    if (name === 'clouds') {
      return 'cloud'
    } else if (name === 'sun') {
      return 'sun'
    } else if (name === 'rain') {
      return 'cloud-showers-heavy'
    } else if (name === 'thunderstorm') {
      return 'cloud-bolt'
    } else {
      return ''
    }
  }
}
