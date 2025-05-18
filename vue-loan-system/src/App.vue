<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
auth.loadFromStorage()
</script>

<template>
  <div id="app-container">
    <!-- Left Panel -->
    <div class="left-panel">
      <img src="./assets/loan.png" alt="Loan illustration" class="loan-image" />
    </div>

    <!-- Right Panel -->
    <div class="right-panel">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
#app-container {
  display: flex;
  height: 100vh;
  width: 100vw;
}

/* Left Panel */
.left-panel {
  flex: 1;
  background-color: #428d5a;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.loan-image {
  max-width: 80%;
  height: auto;
}

/* Right Panel */
.right-panel {
  flex: 1;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  overflow-y: auto;
}

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
/* Button Styling */
button {
  padding: 0.5rem 1.2rem;
  background: #42b983;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 6px;
  font-size: 1rem;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  #app-container {
    flex-direction: column;
  }

  .left-panel,
  .right-panel {
    flex: none;
    width: 100%;
    height: 50vh;
  }

  .loan-image {
    max-width: 60%;
  }
}
</style>
