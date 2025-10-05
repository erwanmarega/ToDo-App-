<template>
  <div class="screen-root-main">
    <Navbar />
    <div class="screen-title-root">
      <div>
        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14 8-4 4 4 4"/>
        </svg>
        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m10 16 4-4-4-4"/>
        </svg>
      </div>
      <h1 class="screen-title">Nom du projet</h1>
      <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.5 8H4m0-2v13a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-5.032a1 1 0 0 1-.768-.36l-1.9-2.28a1 1 0 0 0-.768-.36H5a1 1 0 0 0-1 1Z"/>
      </svg>
    </div>
    <router-view />
    <card-content />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import CardContent from './components/CardContent.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    CardContent
  }
}
</script>

<style scoped>

.screen-root-main {
display: flex;
}


.screen-title-root{
  position: fixed;
  top: 0;
  left: 240px;
  padding: 2rem;
  align-items: center;
  display: flex;
  gap: 1rem;
  z-index: 10;
}

.screen-title{
  padding-left: 22rem;
}
</style>
