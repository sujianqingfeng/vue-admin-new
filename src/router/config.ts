import { RouteRecordRaw } from 'vue-router'

const routers: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/pages/login/index.vue')
  }
]

export default routers
