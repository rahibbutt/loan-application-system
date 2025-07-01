<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import WelcomeView from './views/WelcomeView.vue'
import LoginView from './views/LoginView.vue'
</script>

<template>
  <div class="flex flex-col md:flex-row w-screen h-screen">
    <!-- Left Section: Green background with full-height background image -->
    <div
      class="w-full md:w-4/5 h-1/2 md:h-full bg-[#428d5a] bg-[url('@/assets/loan-management.png')] bg-no-repeat bg-center bg-cover"
    >
      <!-- Background image fills entire section -->
    </div>

    <!-- Right Section: Welcome and content -->
    <div
      class="w-full md:w-2/5 h-1/2 bg-gray-100 md:h-full flex flex-col items-center justify-center px-6 py-12"
    >
      <RouterView />
    </div>
  </div>
</template>
