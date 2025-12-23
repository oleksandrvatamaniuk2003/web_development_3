<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from '../axios';

const route = useRoute();
const movie = ref(null);
const loading = ref(true);

onMounted(async () => {
  try {
    // Беремо ID фільму з URL (наприклад, /movie/1 -> id=1)
    const movieId = route.params.id;
    const response = await axios.get(`movies/${movieId}/`);
    movie.value = response.data;
  } catch (error) {
    console.error("Не вдалося завантажити фільм:", error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="container mt-4">
    <router-link to="/" class="btn btn-outline-secondary mb-3">&larr; Назад до списку</router-link>

    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status"></div>
    </div>

    <div v-else-if="movie" class="card shadow-lg">
      <div class="card-header bg-dark text-white">
        <h2>{{ movie.title }}</h2>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-8">
            <h5 class="text-muted mb-3">Деталі фільму</h5>
            <ul class="list-group list-group-flush mb-4">
              <li class="list-group-item"><strong>Рік виходу:</strong> {{ movie.release_year }}</li>
              <li class="list-group-item"><strong>Жанр:</strong> {{ movie.genre }}</li>
              <li class="list-group-item"><strong>Режисер:</strong> {{ movie.director }}</li>
            </ul>

            <h5 class="text-muted">Опис сюжету</h5>
            <p class="card-text lead">{{ movie.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="alert alert-warning">
      Фільм не знайдено.
    </div>
  </div>
</template>