import { RouteRecordRaw } from 'vue-router'

type RouterMap = {
  [key: string]: RouteRecordRaw
}

const view = {
  blank: () => import('@/layouts/blank-view.vue')
}

export const routerMap: RouterMap = {
  dashboard: {
    path: '/dashboard',
    component: () => import('@/pages/dashboard/index.vue')
  }
}
