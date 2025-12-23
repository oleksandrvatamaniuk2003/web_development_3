import { createRouter, createWebHistory } from 'vue-router'

const HomeView = { template: '<h2>Список фільмів буде тут</h2>' }
const LoginView = { template: '<h2>Форма входу буде тут</h2>' }

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