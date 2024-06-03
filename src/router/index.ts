import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import chart from '@/components/chart.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/graphic',
      name: 'chart',
      component: chart
    }
  ]
})

export default router
