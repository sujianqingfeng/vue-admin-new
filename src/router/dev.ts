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
          icon: 'cloud',
          title: 'Dashboard',
          canNotRemoveTab: true
        }
      },
      {
        path: '/permission',
        name: 'permission',
        component: () => import('@/pages/permission/index.vue'),
        meta: {
          title: '权限',
          icon: 'cloud'
        }
      },
      {
        path: '/multiple',
        name: '多级菜单',
        component: () => import('@/pages/permission/index.vue'),
        meta: {
          icon: 'cloud'
        },
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
