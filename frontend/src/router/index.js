import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const LoginView = { template: '<h2>Тут буде вхід</h2>' }

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ]
})

export default router