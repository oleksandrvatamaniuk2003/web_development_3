<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4 rounded">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Movie Catalog</a>
        <div class="navbar-nav me-auto">
          <router-link class="nav-link" to="/">Головна</router-link>
        </div>
        <div class="d-flex">
           <router-link class="btn btn-outline-light btn-sm" to="/login">Вхід</router-link>
        </div>
      </div>
    </nav>

    <RouterView />
  </div>
</template>