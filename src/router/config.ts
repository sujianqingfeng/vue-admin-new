import { RouteRecordRaw } from 'vue-router'

const routers: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/pages/login/index.vue')
  },
  {
    path: '/',
    component: () => import('@/layouts/admin-layout.vue'),
    children: []
  }
]

export default routers
