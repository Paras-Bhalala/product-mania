<template>
  <section class="flex items-center justify-center min-h-[80vh] px-4 py-12">
    <div class="w-full max-w-md">
      <!-- Card -->
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <!-- Title -->
        <h1 class="text-3xl font-bold text-gray-900 text-center mb-2">Welcome Back</h1>
        <p class="text-gray-500 text-center mb-8">Sign in to your account</p>

        <!-- Error alert -->
        <div
          v-if="errorMsg"
          class="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700"
        >
          {{ errorMsg }}
        </div>
        <!-- Form -->
        <form @submit.prevent="handleLogin" class="space-y-5">
          <!-- Email field -->
          <div>
            <label for="login-email" class="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              id="login-email"
              v-model.trim="email"
              type="email"
              required
              autocomplete="email"
              placeholder="you@example.com"
              class="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 transition-colors duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
            />
          </div>

          <!-- Password field -->
          <div>
            <label for="login-password" class="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="login-password"
              v-model="password"
              type="password"
              required
              autocomplete="current-password"
              placeholder="••••••••"
              class="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 transition-colors duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
            />
          </div>

          <!-- Submit button -->
          <button
            type="submit"
            class="w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer"
          >
            Sign In
          </button>
        </form>

        <!-- Link to sign-up -->
        <p class="mt-6 text-center text-sm text-gray-500">
          Don't have an account?
          <router-link
            to="/signup"
            class="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
          >
            Create one
          </router-link>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

// --- Router ---
const router = useRouter()

// --- Composable ---
const { login } = useAuth()

// --- Local form state ---
const email = ref('')
const password = ref('')
const errorMsg = ref('')

// --- Methods ---

/** Handle form submission for login. */
async function handleLogin() {
  errorMsg.value = ''

  // Basic client-side validation
  if (!email.value || !password.value) {
    return
  }

  const isSuccess = await login(email.value, password.value)

  if (isSuccess) {
    // Reset form and redirect to home
    email.value = ''
    password.value = ''
    router.push('/')
  } else {
    errorMsg.value = 'Invalid email or password. Please try again.'
  }
}
</script>
