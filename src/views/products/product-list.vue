<template>
  <section class="flex justify-center p-4">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      <div
        v-for="product in products"
        :key="product.id"
        class="flex flex-col border bg-white rounded-lg shadow-md p-2 hover:shadow-lg transition-all duration-300"
      >
        <img
          :src="product.thumbnail"
          :alt="product.title"
          class="w-full h-48 object-contain mb-4 rounded-lg"
        />
        <h3 class="text-xl font-bold mb-2 line-clamp-1">{{ product.title }}</h3>
        <p class="text-gray-600 mb-4 line-clamp-2 flex-1">{{ product.description }}</p>
        <p class="text-green-600 font-bold mt-auto">${{ product.price }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const products = ref([])

onMounted(() => {
  fetchProducts()
})

async function fetchProducts() {
  const response = await fetch(import.meta.env.VITE_PRODUCT_API_URL)
  const json = await response.json()
  products.value = json.products
}
</script>
