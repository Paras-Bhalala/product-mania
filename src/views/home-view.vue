<template>
  <section
    class="flex items-center justify-center min-h-[70vh] bg-gradient-to-br from-indigo-600 to-blue-500 text-white text-center p-8"
  >
    <div>
      <h1 class="text-4xl font-bold mb-2">Welcome to MyApp</h1>
      <p class="text-xl mb-6">
        Experience the best of modern web design with a sleek, responsive interface.
      </p>
      <router-link
        to="/about"
        class="inline-block px-6 py-3 bg-white text-blue-500 rounded-lg no-underline font-semibold transition-colors duration-300 hover:bg-indigo-100 hover:text-blue-900"
        >Learn More</router-link
      >
    </div>
  </section>
  <section class="py-10 container mx-auto px-6">
    <div class="flex items-center justify-between gap-6 mb-6">
      <h2 class="text-center text-2xl font-bold">Our Products</h2>
      <button class="btn cursor-pointer border text-center rounded p-1.5" @click="goToProducts()">
        See all products
      </button>
    </div>
    <div v-if="isLoading" class="text-center text-xl">Loading products...</div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ProductCard from '@/components/ProductCard.vue'

const router = useRouter()
const products = ref([])

onMounted(() => {
  fetchProducts()
})

async function fetchProducts() {
  const response = await fetch(`${import.meta.env.VITE_PRODUCT_API_URL}?limit=5`)
  const json = await response.json()
  products.value = json.products
}

function goToProducts() {
  router.push('/products')
}
</script>
