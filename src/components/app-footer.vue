<template>
  <footer class="bg-gray-950 text-gray-300 py-4 text-sm">
    <div class="max-w-7xl mx-auto flex items-center justify-between px-4 max-md:flex-col max-md:items-start">
      <p>© 2026 MyApp. All rights reserved.</p>
      <nav class="max-md:mt-2">
        <router-link to="/terms" class="ml-4 text-inherit no-underline hover:text-white transition-colors">Terms</router-link>
        <router-link to="/privacy" class="ml-4 text-inherit no-underline hover:text-white transition-colors">Privacy</router-link>
        <router-link to="/contact" class="ml-4 text-inherit no-underline hover:text-white transition-colors">Contact</router-link>
      </nav>
    </div>
  </footer>
</template>

<script setup>
// static footer, no logic needed
</script>
