<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)

const goToLogin = () => {
  if (!loading.value) {
    router.push('/auth/login')
  }
}
</script>

<template>
  <main>
    <h1>Welcome to the system!</h1>

    <button 
      :disabled="loading" 
      type="button" 
      class="btn-login" 
      @click="goToLogin"
    >
      {{ loading ? 'Logging in…' : 'Login' }}
    </button>

    <div class="register-link">
      <span style="color: black;">Don't have an account?</span>
      <RouterLink to="/auth/register">Register</RouterLink>
    </div>
  </main>
</template>


<style scoped>
.right-panel h1 {
  color: #2c7a4b; /* Deep professional green */
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1.5rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  letter-spacing: 0.5px;
  line-height: 1.2;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
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
