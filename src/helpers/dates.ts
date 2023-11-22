import dayjs from 'dayjs'

export class Dates {
  static getDays(date: string) {
    return dayjs(date).format('dddd')
  }
}
