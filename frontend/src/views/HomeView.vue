<script setup>
import { ref, onMounted } from 'vue';
import axios from '../axios';
const movies = ref([]);
const searchQuery = ref('');
const selectedGenre = ref('');
const selectedDirector = ref('');
const getMovies = async () => {
  try {
    const response = await axios.get('movies/', {
      params: {
        search: searchQuery.value,
        genre: selectedGenre.value,
        director: selectedDirector.value
      }
    });
    movies.value = response.data; // Зберігаємо результат
  } catch (error) {
    console.error("Помилка при завантаженні фільмів:", error);
  }
};

onMounted(() => {
  getMovies();
});
</script>

<template>
  <div>
    <div class="card p-3 mb-4 bg-light">
      <div class="row g-3">
        <div class="col-md-4">
          <input
            v-model="searchQuery"
            @input="getMovies"
            type="text"
            class="form-control"
            placeholder="Пошук за назвою..."
          >
        </div>
        <div class="col-md-3">
          <input
            v-model="selectedGenre"
            @input="getMovies"
            type="text"
            class="form-control"
            placeholder="Фільтр по жанру"
          >
        </div>
        <div class="col-md-3">
           <input
            v-model="selectedDirector"
            @input="getMovies"
            type="text"
            class="form-control"
            placeholder="Фільтр по режисеру"
          >
        </div>
        <div class="col-md-2">
          <button @click="getMovies" class="btn btn-primary w-100">Шукати</button>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4 mb-4" v-for="movie in movies" :key="movie.id">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">{{ movie.title }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{ movie.release_year }} | {{ movie.genre }}</h6>
            <p class="card-text text-truncate">{{ movie.description }}</p>
            <p class="card-text"><small class="text-muted">Режисер: {{ movie.director }}</small></p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="movies.length === 0" class="text-center mt-5">
      <h3>Фільмів не знайдено 😕</h3>
      <p>Спробуйте змінити параметри пошуку або додайте фільми через адмінку.</p>
    </div>
  </div>
</template>

<style scoped>
/* Стилі суто для цієї сторінки */
.card-text.text-truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>