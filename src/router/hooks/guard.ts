import { NavigationGuard, Router } from 'vue-router'
import { info } from '@/utils/log'
import { isDev } from '@/utils/share'

import devRouters from '../dev'
import { addRoutes } from '../utils'
import { useAsyncRoute } from './async'

type Guard = {
  beforeEach?: NavigationGuard
}

type GuardWithRouter = (router: Router) => Guard

const asyncRouteGuard: GuardWithRouter = (router) => {
  let isRegisterRouter = false
  return {
    beforeEach: (to, from, next) => {
      if (isRegisterRouter) {
        next()
      } else {
        // 为了方便开发 添加了一个开发路由
        if (isDev) {
          info('开发环境，加载开发路由：', devRouters)
          addRoutes(router, devRouters)
        }

        const { loadAsyncRoute } = useAsyncRoute(router)
        loadAsyncRoute()

        next({ ...to, replace: true })
        isRegisterRouter = true
      }
    }
  }
}

export const useGuards = (router: Router) => {
  const guards: GuardWithRouter[] = [asyncRouteGuard]

  const loadGuards = () => {
    guards.forEach((guard) => {
      const { beforeEach } = guard(router)
      if (beforeEach) {
        router.beforeEach(beforeEach)
      }
    })
  }

  return { loadGuards }
}
