import { RouteRecordRaw } from 'vue-router'

const routers: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/pages/login/index.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/pages/not-found/index.vue')
  }
]

export default routers
