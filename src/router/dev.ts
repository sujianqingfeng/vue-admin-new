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
          icon: 'cloud'
        }
      },
      {
        path: '/permission',
        name: '权限',
        component: () => import('@/pages/permission/index.vue'),
        meta: {
          icon: 'cloud'
        }
      },
      {
        path: '/keep-alive',
        name: 'KeepAlive',
        component: () => import('@/pages/permission/index.vue'),
        meta: {},
        children: [
          {
            path: '/active/1',
            name: 'test1',
            component: () => import('@/pages/permission/index.vue')
          },
          {
            path: '/active/2',
            name: 'test2',
            component: () => import('@/pages/permission/index.vue')
          }
        ]
      }
    ]
  }
]

export default routers
