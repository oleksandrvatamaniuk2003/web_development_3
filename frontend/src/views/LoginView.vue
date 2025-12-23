<script setup>
import { ref } from 'vue';
import axios from '../axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref('');
const password = ref('');
const errorMessage = ref('');

const handleLogin = async () => {
  try {
    const response = await axios.post('token/', {
      username: username.value,
      password: password.value
    });

    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);

    window.location.href = '/';
  } catch (error) {
    errorMessage.value = 'Невірний логін або пароль';
    console.error(error);
  }
};
</script>

<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <div class="card shadow">
        <div class="card-body">
          <h3 class="card-title text-center mb-4">Вхід у систему</h3>

          <div v-if="errorMessage" class="alert alert-danger">
            {{ errorMessage }}
          </div>

          <form @submit.prevent="handleLogin">
            <div class="mb-3">
              <label class="form-label">Логін (Username)</label>
              <input v-model="username" type="text" class="form-control" required>
            </div>
            <div class="mb-3">
              <label class="form-label">Пароль</label>
              <input v-model="password" type="password" class="form-control" required>
            </div>
            <button type="submit" class="btn btn-primary w-100">Увійти</button>
          </form>

          <div class="mt-3 text-center">
            <p>Немає акаунту? <router-link to="/register">Зареєструватися</router-link></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>