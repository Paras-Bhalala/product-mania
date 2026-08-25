<template>
  <section class="flex items-center justify-center min-h-[70vh] bg-gradient-to-br from-indigo-600 to-blue-500 text-white text-center p-8">
    <div>
      <h1 class="text-4xl font-bold mb-2">Welcome to MyApp</h1>
      <p class="text-xl mb-6">Experience the best of modern web design with a sleek, responsive interface.</p>
      <router-link
        to="/about"
        class="inline-block px-6 py-3 bg-white text-blue-500 rounded-lg no-underline font-semibold transition-colors duration-300 hover:bg-indigo-100 hover:text-blue-900"
      >Learn More</router-link>
    </div>
  </section>
</template>

<script setup>
// No script needed for static hero
</script>
