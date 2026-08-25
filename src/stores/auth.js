import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/**
 * Auth Store
 *
 * Holds the authenticated user state shared across components.
 * Uses setup-syntax store per convention §14.
 */
export const useAuthStore = defineStore('auth', () => {
  // --- State ---
  const currentUser = ref(null)

  // --- Getters ---
  const isAuthenticated = computed(() => currentUser.value !== null)

  // --- Actions ---

  /**
   * Set the authenticated user and persist to localStorage.
   *
   * @param {import('@/services/userService').User} user
   */
  function setUser(user) {
    currentUser.value = user
    localStorage.setItem('auth_user', JSON.stringify(user))
  }

  /** Clear the authenticated user from state and localStorage. */
  function clearUser() {
    currentUser.value = null
    localStorage.removeItem('auth_user')
  }

  /** Rehydrate user state from localStorage on app startup. */
  function loadFromStorage() {
    const stored = localStorage.getItem('auth_user')

    if (stored) {
      try {
        currentUser.value = JSON.parse(stored)
      } catch {
        // Corrupted data — clear it
        localStorage.removeItem('auth_user')
      }
    }
  }

  return {
    currentUser,
    isAuthenticated,
    setUser,
    clearUser,
    loadFromStorage,
  }
})
