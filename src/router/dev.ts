import { RouteRecordRaw } from 'vue-router'

const routers: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/admin-layout.vue'),
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/pages/dashboard/index.vue'),
        meta: {
          icon: 'fff',
          invisible: true
        }
      },
      {
        path: '/permission',
        name: '权限',
        component: () => import('@/pages/permission/index.vue'),
        meta: {
          icon: ''
        }
      }
    ]
  }
]

export default routers
