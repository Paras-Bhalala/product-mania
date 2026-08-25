import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // Lazy-loaded route per convention §16
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      meta: { requiresAuth: false, guestOnly: true },
      component: () => import('../views/login-view.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      meta: { requiresAuth: false, guestOnly: true },
      component: () => import('../views/signup-view.vue'),
    },
  ],
})

/**
 * Navigation guard.
 * - Redirects authenticated users away from guest-only routes (login/signup).
 * - Redirects unauthenticated users away from protected routes (future-proofing).
 */
router.beforeEach((to) => {
  const authStore = useAuthStore()

  // Rehydrate from localStorage on first navigation
  if (!authStore.currentUser) {
    authStore.loadFromStorage()
  }

  // If route is guest-only and user is already logged in, redirect to home
  if (to.meta.guestOnly && authStore.isAuthenticated) {
    return { name: 'home' }
  }

  // If route requires auth and user is not logged in, redirect to login
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: 'login' }
  }
})

export default router
