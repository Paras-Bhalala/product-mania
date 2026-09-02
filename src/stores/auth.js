import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// ── Cookie helpers ────────────────────────────────────────────────────────────

const COOKIE_DAYS = 7

/**
 * Write a cookie that expires in COOKIE_DAYS days.
 * @param {string} name
 * @param {string} value
 */
function setCookie(name, value) {
  const expires = new Date(Date.now() + COOKIE_DAYS * 864e5).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Strict`
}

/**
 * Read a cookie by name, returns null if absent.
 * @param {string} name
 * @returns {string|null}
 */
function getCookie(name) {
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'))
  return match ? decodeURIComponent(match[1]) : null
}

/**
 * Delete a cookie by setting its expiry in the past.
 * @param {string} name
 */
function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict`
}

// ── Store ─────────────────────────────────────────────────────────────────────

const TOKEN_KEY = 'auth_token'
const NAME_KEY  = 'auth_name'
const EMAIL_KEY = 'auth_email'

export const useAuthStore = defineStore('auth', () => {
  // Initialise from cookies so the session survives page refreshes
  const _token = ref(getCookie(TOKEN_KEY))
  const _name  = ref(getCookie(NAME_KEY))
  const _email = ref(getCookie(EMAIL_KEY))

  const isAuthenticated = computed(() => !!_token.value)

  /** Computed user object — null when logged out. */
  const currentUser = computed(() =>
    _token.value ? { name: _name.value, email: _email.value } : null,
  )

  /**
   * Persist auth state in cookies.
   * @param {{ name: string, email: string }} user
   */
  function setUser({ name, email }) {
    setCookie(TOKEN_KEY, '1')
    setCookie(NAME_KEY,  name)
    setCookie(EMAIL_KEY, email)
    _token.value = '1'
    _name.value  = name
    _email.value = email
  }

  /** Remove all auth cookies on logout. */
  function clearUser() {
    deleteCookie(TOKEN_KEY)
    deleteCookie(NAME_KEY)
    deleteCookie(EMAIL_KEY)
    _token.value = null
    _name.value  = null
    _email.value = null
  }

  return { isAuthenticated, currentUser, setUser, clearUser }
})
