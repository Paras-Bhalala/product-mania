<template>
  <section class="flex items-center justify-center min-h-[80vh] px-4 py-12">
    <div class="w-full max-w-md">
      <!-- Card -->
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <!-- Title -->
        <h1 class="text-3xl font-bold text-gray-900 text-center mb-2">Create Account</h1>
        <p class="text-gray-500 text-center mb-8">Sign up to get started</p>

        <!-- Form -->
        <form @submit.prevent="handleSignUp" class="space-y-5">
          <!-- Name field -->
          <div>
            <label for="signup-name" class="block text-sm font-medium text-gray-700 mb-1">
              Full name
            </label>
            <input
              id="signup-name"
              v-model.trim="name"
              type="text"
              required
              autocomplete="name"
              placeholder="John Doe"
              class="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 transition-colors duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
            />
          </div>

          <!-- Email field -->
          <div>
            <label for="signup-email" class="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              id="signup-email"
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
            <label for="signup-password" class="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="signup-password"
              v-model="password"
              type="password"
              required
              minlength="6"
              autocomplete="new-password"
              placeholder="••••••••"
              class="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 transition-colors duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
            />
          </div>

          <!-- Confirm password field -->
          <div>
            <label
              for="signup-confirm-password"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm password
            </label>
            <input
              id="signup-confirm-password"
              v-model="confirmPassword"
              type="password"
              required
              minlength="6"
              autocomplete="new-password"
              placeholder="••••••••"
              class="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 transition-colors duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
            />
            <!-- Password mismatch hint -->
            <p
              v-if="confirmPassword && password !== confirmPassword"
              class="mt-1 text-xs text-red-500"
            >
              Passwords do not match.
            </p>
          </div>

          <!-- Submit button -->
          <button
            type="submit"
            class="w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-white font-semibold transition-colors duration-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          >
            Create Account
          </button>
        </form>

        <!-- Link to login -->
        <p class="mt-6 text-center text-sm text-gray-500">
          Already have an account?
          <router-link
            to="/login"
            class="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
          >
            Sign in
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

const router = useRouter()
const { signUp } = useAuth()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

async function handleSignUp() {
  if (password.value !== confirmPassword.value) {
    return
  }

  const isSuccess = await signUp(name.value, email.value, password.value)

  if (isSuccess) {
    router.push('/login')
  }
}
</script>
