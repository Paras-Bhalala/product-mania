<template>
  <div class="flex flex-col min-h-screen">
    <AppHeader />
    <main class="flex-1 bg-gray-50">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import AppHeader from '@/components/app-header.vue'
import AppFooter from '@/components/app-footer.vue'
</script>
