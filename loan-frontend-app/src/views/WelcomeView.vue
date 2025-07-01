<script setup lang="ts">
import { RouterLink } from 'vue-router'
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
  <main class="max-w-lg mx-auto px-4 py-8">
    <!-- Heading -->
    <h1
      class="text-3xl sm:text-4xl font-bold text-gray-700 text-center mb-6 leading-snug tracking-wide"
    >
      Welcome to the system!
    </h1>

    <!-- Login Button -->
    <button
      :disabled="loading"
      type="button"
      @click="goToLogin"
      class="block mx-auto w-full max-w-sm px-12 py-3 bg-[#428d5a] text-white font-semibold text-base rounded-lg shadow-md transition-colors duration-300 hover:bg-blue-700 disabled:opacity-60"
    >
      {{ loading ? 'Logging in…' : 'Login' }}
    </button>

    <!-- Register Link -->
    <div class="mt-4 text-center text-sm text-gray-800">
      <span>Don't have an account?</span>
      <RouterLink to="/auth/register" class="ml-1 text-blue-600 font-semibold hover:underline">
        Register
      </RouterLink>
    </div>
  </main>
</template>
