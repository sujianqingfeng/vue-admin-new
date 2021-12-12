import { RouteRecordRaw, Router } from 'vue-router'
import type { RouteConfig } from '@/types/route'

import { routeMap } from '../async/route.map'
import { warn } from '@/utils/log'

export const parseRoute = (configs: RouteConfig[]) => {
  const routers: RouteRecordRaw[] = []

  for (const config of configs) {
    console.log(config)
    const { name, children = [] } = config
    const route = routeMap[name]

    if (!route) {
      warn('不存在当前路由，请在map中查看是否存在，或者是否拼写错误')
      break
    }

    if (children.length) {
      route.children = parseRoute(children)
    }

    routers.push(route)
  }

  return routers
}

export const addRoutes = (router: Router, routes: RouteRecordRaw[] = []) => {
  routes.forEach((route) => {
    router.addRoute(route)
  })
}
