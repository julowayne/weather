import { useDark } from '@vueuse/core'

export const isDark = useDark({
  selector: 'html',
  attribute: 'data-bs-theme',
  valueDark: 'dark',
  valueLight: 'light',
})