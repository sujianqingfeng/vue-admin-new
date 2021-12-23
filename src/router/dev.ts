import { RouteRecordRaw } from 'vue-router'

import BlankView from '@/layouts/blank-view.vue'

const routers: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/index.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/pages/dashboard/index.vue'),
        meta: {
          icon: 'cloud',
          title: 'Dashboard',
          canNotRemoveTab: true
        }
      },
      {
        path: 'permission',
        name: 'permission',
        component: () => import('@/pages/permission/index.vue'),
        meta: {
          title: '权限',
          icon: 'cloud'
        }
      },
      {
        path: 'dynamic',
        name: 'dynamic',
        component: () => import('@/pages/dynamic/index.vue'),
        meta: {
          title: '动态组件测试',
          icon: 'cloud'
        }
      },
      {
        path: 'multiple',
        name: 'multiple',
        component: BlankView,
        meta: {
          icon: 'cloud',
          title: '多级菜单'
        },
        children: [
          {
            path: 'keep-alive',
            name: 'keep-alive',
            component: BlankView,
            children: [
              {
                path: '',
                name: 'keep1',
                component: () => import('@/pages/keep-alive/test1.vue'),
                meta: {
                  invisible: true
                }
              },
              {
                path: 'keep2',
                name: 'keep2',
                component: () => import('@/pages/keep-alive/test2.vue'),
                meta: {
                  invisible: true
                }
              }
            ]
          },
          {
            path: 'test2',
            name: 'test2',
            component: () => import('@/pages/permission/index.vue')
          }
        ]
      }
    ]
  }
]

export default routers
