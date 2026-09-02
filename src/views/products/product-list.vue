<template>
  <section class="flex justify-center p-4">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      <!-- Skeleton cards shown while loading -->
      <!-- Skeleton cards shown while loading -->
      <template v-if="isLoading && products.length === 0">
        <div
          v-for="n in 10"
          :key="n"
          class="flex flex-col border bg-white rounded-lg shadow-md p-2 animate-pulse"
        >
          <div class="w-full h-48 bg-gray-300 mb-4 rounded-lg"></div>
          <div class="w-3/4 h-4 bg-gray-300 mb-2 rounded"></div>
          <div class="w-full h-3 bg-gray-300 mb-2 rounded"></div>
          <div class="w-1/4 h-4 bg-gray-300 mt-auto rounded"></div>
        </div>
      </template>

      <!-- Real product cards -->
      <ProductCard
        v-if="!isLoading || products.length"
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>

    <!-- sentinel – triggers loading next page when it appears near the bottom -->
    <div v-if="hasMore" ref="sentinel" class="h-10 mt-4"></div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import ProductCard from '@/components/ProductCard.vue'

const products = ref([])
const router = useRouter()
const page = ref(1)
const hasMore = ref(true)
const isLoading = ref(false)
const sentinel = ref(null)
let observer = null

// ----- IntersectionObserver setup -----
const setupObserver = () => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasMore.value && !isLoading.value) {
          loadMore()
        }
      })
    },
    { rootMargin: '0px 0px 200px 0px' },
  )
  if (sentinel.value) observer.observe(sentinel.value)
}

// ----- Load more logic -----
function loadMore() {
  if (!hasMore.value || isLoading.value) return
  isLoading.value = true
  page.value++
  fetchProducts().finally(() => {
    isLoading.value = false
  })
}

// ----- Data fetching -----
async function fetchProducts() {
  try {
    const baseUrl = import.meta.env.VITE_PRODUCT_API_URL || ''
    const cleanedUrl = baseUrl.replace(/\/products\/?$/, '')
    const response = await fetch(`${cleanedUrl}/products?limit=10&skip=${(page.value - 1) * 10}`)
    const json = await response.json()
    if (!json?.products?.length) {
      hasMore.value = false
      return
    }
    products.value = [...products.value, ...json.products]
  } catch (err) {
    console.error('Error fetching products:', err)
    hasMore.value = false
  }
}

// ----- Lifecycle hooks -----
onMounted(async () => {
  await fetchProducts()
  await nextTick()
  setTimeout(setupObserver, 150)
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})

</script>
