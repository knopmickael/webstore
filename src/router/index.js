import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/products/:id',
      name: 'products',
      component: () => import('../views/ProductView.vue')
    },
    {
      path: '/categories/:slug',
      name: 'categories',
      component: () => import('../views/CategoriesView.vue')
    }
  ]
})

export default router
