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
    movies.value = response.data;
  } catch (error) {
    console.error("Помилка:", error);
  }
};

onMounted(() => {
  getMovies();
});
</script>

<template>
  <div>
    <div class="card p-3 mb-4 bg-light shadow-sm">
      <div class="row g-3">
        <div class="col-md-4">
          <input
            v-model="searchQuery"
            @input="getMovies"
            type="text"
            class="form-control"
            placeholder="🔍 Пошук за назвою..."
          >
        </div>
        <div class="col-md-3">
          <input
            v-model="selectedGenre"
            @input="getMovies"
            type="text"
            class="form-control"
            placeholder="🎭 Фільтр по жанру"
          >
        </div>
        <div class="col-md-3">
           <input
            v-model="selectedDirector"
            @input="getMovies"
            type="text"
            class="form-control"
            placeholder="🎬 Фільтр по режисеру"
          >
        </div>
        <div class="col-md-2">
          <button @click="getMovies" class="btn btn-primary w-100">Оновити</button>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4 mb-4" v-for="movie in movies" :key="movie.id">
        <div class="card h-100 shadow-sm hover-card">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">
              <router-link :to="{ name: 'movie-detail', params: { id: movie.id } }" class="text-decoration-none text-dark">
                {{ movie.title }}
              </router-link>
            </h5>
            <h6 class="card-subtitle mb-2 text-muted">{{ movie.release_year }} | {{ movie.genre }}</h6>
            <p class="card-text text-truncate">{{ movie.description }}</p>

            <div class="mt-auto">
               <p class="card-text mb-2"><small class="text-muted">Режисер: {{ movie.director }}</small></p>
               <router-link :to="{ name: 'movie-detail', params: { id: movie.id } }" class="btn btn-outline-primary btn-sm w-100">
                 Детальніше
               </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="movies.length === 0" class="text-center mt-5 text-muted">
      <h3>Фільмів не знайдено 😕</h3>
    </div>
  </div>
</template>

<style scoped>
.card-text.text-truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.hover-card:hover {
  transform: translateY(-5px);
  transition: transform 0.2s;
  cursor: pointer;
}
</style>