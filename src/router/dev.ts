import { RouteRecordRaw } from 'vue-router'

const routers: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/admin-layout.vue'),
    children: [
      {
        path: '/dashboard',
        component: () => import('@/pages/dashboard/index.vue')
      }
    ]
  }
]

export default routers
