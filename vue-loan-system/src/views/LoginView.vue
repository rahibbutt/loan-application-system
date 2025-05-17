<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="email" type="email" id="email" required />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input v-model="password" type="password" id="password" required />
      </div>

      <button :disabled="loading" type="submit">
        {{ loading ? 'Logging in…' : 'Login' }}
      </button>
    </form>

    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '/src/services/api'

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const router = useRouter()

async function handleLogin() {
  error.value = ''
  loading.value = true

  try {
    const { data } = await api.post('/auth/login', {
      email: email.value,
      password: password.value
    })
    // assume { token: '…', user: {…} }
    localStorage.setItem('jwt', data.token)
    // optionally store user info
    localStorage.setItem('user', JSON.stringify(data.user))
    router.push({ name: 'Home' })
  } catch (err) {
    error.value =
      err.response?.data?.message ||
      'Login failed. Please check your credentials.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 10px;
}

.form-group {
  margin-bottom: 1rem;
}

input {
  width: 100%;
  padding: 0.5rem;
}

button {
  padding: 0.5rem 1rem;
  background: #42b983;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.error {
  color: red;
  margin-top: 1rem;
}
</style>

