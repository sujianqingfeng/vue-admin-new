import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { isDev } from '@/utils/share'
import localRoutes from './local'
import devRouters from './dev'
import { useSetting } from '@/hooks/store/setting'
import { useAccountStore } from '@/store/modules/account'
import { addRoutes, parseRoute } from './utils'

const router = createRouter({
  history: createWebHistory(),
  routes: localRoutes
})

export function setupRouter(app: App) {
  app.use(router)

  let isRegisterRouter = false

  router.beforeEach((to, form, next) => {
    if (isRegisterRouter) {
      next()
    } else {
      // 为了方便开发 添加了一个开发路由
      if (isDev) {
        addRoutes(router, devRouters)
      }

      const { asyncRouter } = useSetting()
      const accountStore = useAccountStore()

      // 异步路由模式
      if (asyncRouter) {
        const asyncRoutes = parseRoute(accountStore.routeConfig)
        addRoutes(router, asyncRoutes)
      }

      next({ ...to, replace: true })

      isRegisterRouter = true
    }
  })
}

export { router }
