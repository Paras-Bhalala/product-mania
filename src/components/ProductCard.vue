<template>
  <div
    class="flex flex-col border bg-zinc-200 rounded-lg shadow-sm p-2 hover:shadow-xl transition-all duration-300 cursor-pointer"
    @click="goToDetail"
  >
    <!-- Thumbnail -->
    <img
      :src="product.thumbnail"
      :alt="product.title"
      class="w-full h-48 object-contain mb-4 rounded-lg"
    />

    <!-- Title -->
    <h3 class="text-xl font-bold mb-2 line-clamp-1">{{ product.title }}</h3>

    <!-- Description -->
    <p class="text-gray-600 mb-4 line-clamp-2 flex-1">{{ product.description }}</p>

    <!-- Price -->
    <p class="text-green-600 font-bold mt-auto">${{ product.price }}</p>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

/**
 * ProductCard — displays a single product and navigates to its detail page on click.
 * Navigation is handled internally — just pass :product and it works everywhere.
 *
 * Usage:  <ProductCard :product="product" />
 */
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const router = useRouter()

function goToDetail() {
  router.push({ name: 'ProductDetail', params: { id: props.product.id } })
}
</script>
