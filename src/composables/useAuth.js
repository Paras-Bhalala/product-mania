import { useAuthStore } from '@/stores/auth'
import { fetchUserByEmail, createUser } from '@/services/userService'

export function useAuth() {
  const authStore = useAuthStore()

  async function login(email, password) {
    const user = await fetchUserByEmail(email)
    if (user && user.password === password) {
      authStore.setUser({ name: user.name, email: user.email })
      return true
    }
    return false
  }

  async function signUp(name, email, password) {
    const existingUser = await fetchUserByEmail(email)
    if (existingUser) return false
    await createUser({ name, email, password })
    return true
  }

  function logout() {
    authStore.clearUser()
  }

  return { login, signUp, logout }
}
