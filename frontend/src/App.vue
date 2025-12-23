<script setup>
import { RouterView } from 'vue-router'
import { ref, onMounted } from 'vue'

const isAuthenticated = ref(false)
onMounted(() => {
  if (localStorage.getItem('access_token')) {
    isAuthenticated.value = true
  }
})

const logout = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  isAuthenticated.value = false
  window.location.href = '/login' // Перекидаємо на вхід
}
</script>

<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4 rounded px-3">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">Movie Catalog</a>

        <div class="navbar-nav me-auto">
          <router-link class="nav-link" to="/">Головна</router-link>
        </div>

        <div class="d-flex gap-2">
           <template v-if="!isAuthenticated">
              <router-link class="btn btn-outline-light btn-sm" to="/login">Вхід</router-link>
              <router-link class="btn btn-warning btn-sm" to="/register">Реєстрація</router-link>
           </template>

           <template v-else>
              <button @click="logout" class="btn btn-danger btn-sm">Вихід</button>
           </template>
        </div>
      </div>
    </nav>

    <RouterView />
  </div>
</template>