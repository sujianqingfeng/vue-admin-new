import type { RouteMap } from '@/types/route'

// const view = {
//   blank: () => import('@/layouts/blank-view.vue')
// }

export const routeMap: RouteMap = {
  root: {
    path: '/',
    component: () => import('@/layouts/index.vue')
  },
  dashboard: {
    path: '/dashboard',
    component: () => import('@/pages/dashboard/index.vue')
  },
  table: {
    path: '/table',
    component: () => import('@/pages/table/index.vue'),
    meta: {
      title: '表格'
    }
  },
  upload: {
    path: '/upload',
    component: () => import('@/pages/upload/index.vue'),
    meta: {
      title: '上传'
    }
  },
  rich: {
    path: '/rich',
    component: () => import('@/pages/rich/index.vue'),
    meta: {
      title: '富文本'
    }
  }
}
