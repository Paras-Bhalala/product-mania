import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { fetchUserByEmail, createUser } from '@/services/userService'

/**
 * useAuth Composable
 *
 * Wraps authentication logic: login, signUp, logout.
 * Exposes reactive loading/error state per convention §11.
 */
export function useAuth() {
  // --- Store ---
  const authStore = useAuthStore()

  // --- Reactive state ---
  const isLoading = ref(false)
  const hasError = ref(false)
  const errorMessage = ref('')

  // --- Computed ---
  const isAuthenticated = computed(() => authStore.isAuthenticated)
  const currentUser = computed(() => authStore.currentUser)

  // --- Actions ---

  /** Clear any previous error state before a new operation. */
  function clearError() {
    hasError.value = false
    errorMessage.value = ''
  }

  /**
   * Log in with email and password.
   * Fetches user by email from the API, then compares passwords client-side.
   *
   * @param {string} email
   * @param {string} password
   * @returns {Promise<boolean>} true if login succeeded
   */
  async function login(email, password) {
    clearError()
    isLoading.value = true

    try {
      const user = await fetchUserByEmail(email)

      if (!user) {
        hasError.value = true
        errorMessage.value = 'No account found with this email.'
        return false
      }

      if (user.password !== password) {
        hasError.value = true
        errorMessage.value = 'Incorrect password. Please try again.'
        return false
      }

      // Success — store the user
      authStore.setUser(user)
      return true
    } catch (error) {
      hasError.value = true
      errorMessage.value = error?.message ?? 'An unexpected error occurred.'
      return false
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Sign up a new user.
   * Checks if email is already taken before creating.
   *
   * @param {string} name
   * @param {string} email
   * @param {string} password
   * @returns {Promise<boolean>} true if sign-up succeeded
   */
  async function signUp(name, email, password) {
    clearError()
    isLoading.value = true

    try {
      // Check if email already exists
      const existingUser = await fetchUserByEmail(email)

      if (existingUser) {
        hasError.value = true
        errorMessage.value = 'An account with this email already exists.'
        return false
      }

      // Create the new user
      await createUser({ name, email, password })
      return true
    } catch (error) {
      hasError.value = true
      errorMessage.value = error?.message ?? 'An unexpected error occurred.'
      return false
    } finally {
      isLoading.value = false
    }
  }

  /** Log out the current user. */
  function logout() {
    authStore.clearUser()
  }

  return {
    isLoading,
    hasError,
    errorMessage,
    isAuthenticated,
    currentUser,
    login,
    signUp,
    logout,
    clearError,
  }
}
