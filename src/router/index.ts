import { createRouter, createWebHistory } from 'vue-router'
import InstructoresView from '@/views/InstructoresView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/Instructores', // 👈 redirección por defecto
    },
    {
      path: '/Instructores',
      name: 'Instructores',
      component: InstructoresView,
    },
  ],
})

export default router
