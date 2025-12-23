<script setup>
import { ref } from 'vue';
import axios from '../axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref('');
const email = ref('');
const password = ref('');
const errorMessage = ref('');

const handleRegister = async () => {
  try {
    await axios.post('register/', {
      username: username.value,
      email: email.value,
      password: password.value
    });

    alert('Реєстрація успішна! Тепер увійдіть.');
    router.push('/login');
  } catch (error) {
    errorMessage.value = 'Помилка реєстрації. Можливо, такий користувач вже існує.';
    console.error(error);
  }
};
</script>

<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <div class="card shadow">
        <div class="card-body">
          <h3 class="card-title text-center mb-4">Реєстрація</h3>

          <div v-if="errorMessage" class="alert alert-danger">
            {{ errorMessage }}
          </div>

          <form @submit.prevent="handleRegister">
            <div class="mb-3">
              <label class="form-label">Логін</label>
              <input v-model="username" type="text" class="form-control" required>
            </div>
            <div class="mb-3">
              <label class="form-label">Email (необов'язково)</label>
              <input v-model="email" type="email" class="form-control">
            </div>
            <div class="mb-3">
              <label class="form-label">Пароль</label>
              <input v-model="password" type="password" class="form-control" required>
            </div>
            <button type="submit" class="btn btn-success w-100">Зареєструватися</button>
          </form>

           <div class="mt-3 text-center">
            <p>Вже є акаунт? <router-link to="/login">Увійти</router-link></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>