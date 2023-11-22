import dayjs from 'dayjs'

export class Dates {
  static getDays(date: Date) {
    return dayjs(date).format('dddd')
  }
}
