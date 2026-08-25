<template>
  <header class="bg-gray-900 text-gray-50 py-3">
    <div class="max-w-7xl mx-auto flex items-center justify-between px-4 max-md:flex-col max-md:items-start">
      <!-- Logo -->
      <router-link to="/" class="text-2xl font-bold text-inherit no-underline">MyApp</router-link>

      <!-- Navigation -->
      <nav class="flex items-center gap-4 max-md:mt-2 max-md:flex-wrap max-md:gap-2">
        <!-- Main links -->
        <router-link
          to="/"
          active-class="after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-0.5 after:bg-blue-500"
          class="relative text-inherit no-underline text-[0.95rem]"
        >Home</router-link>
        <router-link
          to="/about"
          active-class="after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-0.5 after:bg-blue-500"
          class="relative text-inherit no-underline text-[0.95rem]"
        >About</router-link>
        <router-link
          to="/products"
          active-class="after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-0.5 after:bg-blue-500"
          class="relative text-inherit no-underline text-[0.95rem]"
        >Products</router-link>
        <router-link
          to="/contact"
          active-class="after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-0.5 after:bg-blue-500"
          class="relative text-inherit no-underline text-[0.95rem]"
        >Contact</router-link>

        <!-- Divider -->
        <span class="hidden md:block w-px h-5 bg-gray-600" aria-hidden="true"></span>

        <!-- Auth section: logged in -->
        <template v-if="isAuthenticated">
          <span class="text-sm text-gray-300">
            Hi, <span class="font-semibold text-white">{{ currentUser?.name }}</span>
          </span>
          <button
            type="button"
            @click="handleLogout"
            class="rounded-lg bg-gray-700 px-3 py-1.5 text-sm font-medium text-gray-200 transition-colors duration-200 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500/50"
          >
            Logout
          </button>
        </template>

        <!-- Auth section: logged out -->
        <template v-else>
          <router-link
            to="/login"
            class="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white no-underline transition-colors duration-200 hover:bg-indigo-500"
          >Sign In</router-link>
          <router-link
            to="/signup"
            class="rounded-lg border border-gray-500 px-3 py-1.5 text-sm font-medium text-gray-200 no-underline transition-colors duration-200 hover:bg-gray-700"
          >Sign Up</router-link>
        </template>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

// --- Router ---
const router = useRouter()

// --- Store ---
const authStore = useAuthStore()

// Use storeToRefs per convention §6 to keep reactivity when destructuring
const { currentUser, isAuthenticated } = storeToRefs(authStore)

// --- Methods ---

/** Handle logout: clear user state and redirect to home. */
function handleLogout() {
  authStore.clearUser()
  router.push('/')
}
</script>
