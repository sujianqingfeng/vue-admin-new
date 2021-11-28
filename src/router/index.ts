import type { App } from 'vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import asyncRouters from './async/config.async'
import routers from './config'
import { useSettingStore } from '@/store/modules/setting'

function getRouters(async: boolean): RouteRecordRaw[] {
  return async ? asyncRouters : routers
}

const router = createRouter({
  history: createWebHistory(),
  routes: []
})

export function setupRouter(app: App) {
  app.use(router)

  // TODO 后续这里抽取成一个方法
  const setting = useSettingStore()
  const routes = getRouters(setting.asyncRouter)
  routes.forEach((route) => {
    router.addRoute(route)
  })
  router.push('/')
}

export { router }
