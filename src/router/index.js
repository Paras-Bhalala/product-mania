import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home-view.vue'
import AboutView from '../views/about-view.vue'
import ProductList from '../views/products/product-list.vue'
import ProductDetail from '../views/products/[...id].vue'
// import ContactView from '../views/contact-view.vue'
import DefaultLayout from '@/layouts/default-layout.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'HomeView',
          component: HomeView,
        },
        {
          path: 'about',
          name: 'AboutView',
          component: AboutView,
        },
        {
          path: 'products',
          name: 'ProductList',
          component: ProductList,
        },
        {
          path: 'products/:id',
          name: 'ProductDetail',
          component: ProductDetail,
        },
      ],
    },
    {
      path: '/',
      component: DefaultLayout,
      meta: { guestOnly: true },
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/login-view.vue'),
        },
        {
          path: 'signup',
          name: 'signup',
          component: () => import('../views/signup-view.vue'),
        },
      ],
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
