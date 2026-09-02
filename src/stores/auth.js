import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const AUTH_KEY = 'auth_token'

export const useAuthStore = defineStore('auth', () => {
  // Reactive ref — initialised from localStorage so it survives page refreshes
  const _token = ref(localStorage.getItem(AUTH_KEY) ?? null)

  const isAuthenticated = computed(() => !!_token.value)

  // Persist a token so the session survives a page refresh
  function setUser() {
    localStorage.setItem(AUTH_KEY, '1')
    _token.value = '1'
  }

  // Remove the token on logout
  function clearUser() {
    localStorage.removeItem(AUTH_KEY)
    _token.value = null
  }

  return { isAuthenticated, setUser, clearUser }
})
