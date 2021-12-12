import type { RouteMap } from '@/types/route'

// const view = {
//   blank: () => import('@/layouts/blank-view.vue')
// }

export const routeMap: RouteMap = {
  root: {
    path: '/',
    component: () => import('@/layouts/admin-layout.vue')
  },
  dashboard: {
    path: '/dashboard',
    component: () => import('@/pages/dashboard/index.vue')
  }
}
