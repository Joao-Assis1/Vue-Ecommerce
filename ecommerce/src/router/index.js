import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminLayout from '../layouts/AdminLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/cart',
      name: 'cart-view',
      component: () => import('../views/CartView.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminLayout,
      children: [
        {
          path: 'products',
          name: 'admin-products',
          component: () => import('../views/admin/AdminProductsView.vue'),
        },
        {
          path: 'new',
          name: 'admin-new-product',
          component: () => import('../views/admin/AdminNewProductView.vue'),
        },
        {
          path: 'edit/:id', // O :id torna esta rota dinâmica!
          name: 'admin-edit-product',
          component: () => import('../views/admin/AdminEditProductView.vue'),
        },
      ],
    },
  ],
})

export default router
