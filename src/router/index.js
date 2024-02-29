import { userStore } from '@/stores/auth/user'
import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '@/layout/admin-layout.vue'
import { adminMenu } from "@/stores/utils/admin-menu"
import { selfMenu } from "@/stores/utils/self-menu"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'default',
      component: AdminLayout,
      children: [...adminMenu]
    },
    {
      path: '/self',
      name: 'self',
      component: ()=> import('@/layout/default-layout.vue'),
      children: [...selfMenu]
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/layout/auth-layout.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/auth/login-page.vue'),
          meta: {
            secure: false
          }
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'error-page',
      component: () => import('@/views/error-page.vue')
    }
  ]
})


router.beforeEach((to, from, next) => {
  if (!to.meta.secure) {
    next()
  } else {
    const store = userStore()
    store.checkUser()
    next()
  }
})

export default router
