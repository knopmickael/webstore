import { createRouter, createWebHistory } from 'vue-router'

const base_url = process.env.NODE_ENV === 'production' ? '/webstore/' : '/';

const router = createRouter({
  history: createWebHistory(base_url),
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
