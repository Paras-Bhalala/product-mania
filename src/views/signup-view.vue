<template>
  <section class="flex items-center justify-center min-h-[80vh] px-4 py-12">
    <div class="w-full max-w-md">
      <!-- Card -->
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <!-- Title -->
        <h1 class="text-3xl font-bold text-gray-900 text-center mb-2">Create Account</h1>
        <p class="text-gray-500 text-center mb-8">Sign up to get started</p>

        <!-- Success message -->
        <div
          v-if="isSignUpComplete"
          role="status"
          class="mb-6 flex items-center gap-2 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700"
        >
          <svg class="h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
          <span>Account created! Redirecting to login…</span>
        </div>

        <!-- Error alert -->
        <div
          v-if="hasError"
          role="alert"
          class="mb-6 flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700"
        >
          <svg class="h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
              clip-rule="evenodd"
            />
          </svg>
          <span>{{ errorMessage }}</span>
        </div>

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
            <label for="signup-confirm-password" class="block text-sm font-medium text-gray-700 mb-1">
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
            :disabled="isLoading || (confirmPassword && password !== confirmPassword)"
            class="w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-white font-semibold transition-colors duration-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <!-- Loading spinner -->
            <svg
              v-if="isLoading"
              class="h-5 w-5 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            {{ isLoading ? 'Creating account…' : 'Create Account' }}
          </button>
        </form>

        <!-- Link to login -->
        <p class="mt-6 text-center text-sm text-gray-500">
          Already have an account?
          <router-link to="/login" class="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
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

// --- Router ---
const router = useRouter()

// --- Composable ---
const { isLoading, hasError, errorMessage, signUp, clearError } = useAuth()

// --- Local form state ---
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const isSignUpComplete = ref(false)

// --- Methods ---

/** Handle form submission for sign-up. */
async function handleSignUp() {
  clearError()
  isSignUpComplete.value = false

  // Client-side validation: passwords must match
  if (password.value !== confirmPassword.value) {
    return
  }

  const isSuccess = await signUp(name.value, email.value, password.value)

  if (isSuccess) {
    // Show success message, then redirect to login
    isSignUpComplete.value = true
    name.value = ''
    email.value = ''
    password.value = ''
    confirmPassword.value = ''

    setTimeout(() => {
      router.push('/login')
    }, 1500)
  }
}
</script>
