<template>
  <div class="form-container">
    <div class="back-arrow">
      <RouterLink to="/">
        ← Back to Home
      </RouterLink>
    </div>
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="email" type="email" id="email" placeholder="you@example.com" required />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input v-model="password" type="password" id="password" placeholder="Enter your password" required />
      </div>

      <button :disabled="loading" type="submit" class="btn-login">
        {{ loading ? 'Logging in…' : 'Login' }}
      </button>
    </form>

    <p v-if="error" class="error">{{ error }}</p>

    <div class="register-link">
      <span>Don't have an account?</span>
      <RouterLink to="/auth/register">Register</RouterLink>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import api from '/src/services/api'

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const router = useRouter()
const auth = useAuthStore()

async function handleLogin() {
  error.value = ''
  loading.value = true

  try {
  const { data } = await api.post('/auth/login', {
    email: email.value,
    password: password.value
  })
  console.log('Login response:', data)
  // ✅ Clear error only after successful login
  error.value = ''

  localStorage.setItem('jwt', data.token)
  localStorage.setItem('user', JSON.stringify(data.user))

  auth.login(data.user, data.token)
  router.push({ name: 'application' }) // or '/' if not using named routes
} catch (err) {
  console.error('Login error:', err)
  error.value =
    err.response?.data?.message ||
    'Login failed. Please check your credentials.'
} finally {
  loading.value = false
}

}

</script>

<style scoped>
.form-container {
  background-color: #ffffff;
  color: #222;
  padding: 3rem;
  border-radius: 12px;
  border: 1px solid #ddd; /* ✨ Adds visible border */
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1); /* ✨ Slightly stronger shadow */
  width: 100%;
  max-width: 420px;
  margin: auto;
}

.form-container h2 {
  margin-bottom: 0.5rem;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
}

.form-container p {
  margin-bottom: 2rem;
  color: #666;
}

.form-group {
  margin-bottom: 1.0rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #f9f9f9;
  color: #222;
}

.form-group input:focus {
  border-color: #007bff;
  outline: none;
  background-color: #fff;
}

.btn-login {
  width: 100%;
  padding: 0.75rem;
  background-color: #428d5a;
  color: #fff;
  font-weight: bold;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-login:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  margin-top: 1rem;
  font-weight: 500;
}

.register-link {
  margin-top: 1rem;
  text-align: center;
  font-size: 0.95rem;
}

.register-link a {
  color: #007bff;
  margin-left: 0.25rem;
  text-decoration: none;
  font-weight: bold;
}

</style>

