<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import api from '../services/api.ts'

interface User {
  id: number
  name: string
  email: string
  // add other user fields as needed
}

interface LoginResponse {
  token: string
  user: User
}

const email = ref<string>('')
const password = ref<string>('')
const error = ref<string>('')
const loading = ref<boolean>(false)
const router = useRouter()
const auth = useAuthStore()

async function handleLogin(): Promise<void> {
  error.value = ''
  loading.value = true

  try {
    const { data } = await api.post<LoginResponse>('/auth/login', {
      email: email.value,
      password: password.value,
    })

    console.log('Login response:', data)
    error.value = ''

    localStorage.setItem('jwt', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))

    auth.login(data.user, data.token)
    router.push({ name: 'application' })
  } catch (err: unknown) {
    console.error('Login error:', err)
    // Type guard for AxiosError-like shape
    if (
      typeof err === 'object' &&
      err !== null &&
      'response' in err &&
      typeof (err as any).response === 'object' &&
      (err as any).response !== null &&
      'data' in (err as any).response &&
      typeof (err as any).response.data === 'object' &&
      (err as any).response.data !== null &&
      'message' in (err as any).response.data &&
      typeof (err as any).response.data.message === 'string'
    ) {
      error.value = (err as any).response.data.message
    } else {
      error.value = 'Login failed. Please check your credentials.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="w-full max-w-md bg-white rounded-xl shadow-md p-8">
      <h2 class="text-3xl font-bold text-center text-gray-700 mb-6">Login</h2>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <!-- Email -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            v-model="email"
            required
            class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#428d5a] focus:border-[#428d5a]"
          />
        </div>

        <!-- Password -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            v-model="password"
            required
            class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#428d5a] focus:border-[#428d5a]"
          />
        </div>

        <!-- Error Message -->
        <div v-if="error" class="text-red-600 text-sm">{{ error }}</div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full py-2 px-4 bg-[#428d5a] text-white font-semibold rounded-md hover:bg-green-700 transition disabled:opacity-50"
        >
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>
    </div>
  </div>
</template>
