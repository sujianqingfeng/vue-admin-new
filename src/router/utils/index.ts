import { RouteRecordRaw, Router, RouteRecord } from 'vue-router'
import type { RouteConfig } from '@/types/route'

import { routeMap } from '../async/route.map'
import { warn } from '@/utils/log'
import { Menu } from '@/types/account'

export const parseRoute = (configs: RouteConfig[]) => {
  const routes: RouteRecordRaw[] = []

  for (const config of configs) {
    const { name, children = [] } = config
    const route = { ...routeMap[name] }

    if (!route) {
      warn('不存在当前路由，请在map中查看是否存在，或者是否拼写错误')
      break
    }
    if (children.length) {
      route.children = parseRoute(children)
    }

    routes.push(route)
  }

  return routes
}

export const mergeRoute = (router: Router, routes: RouteRecordRaw[]) => {
  console.log(router.getRoutes())

  return routes
}

export const addRoutes = (router: Router, routes: RouteRecordRaw[] = []) => {
  routes.forEach((route) => {
    router.addRoute(route)
  })
}

function filterVisibleMenu(menus: RouteRecordRaw[]) {
  return menus.filter((item) => !item.meta?.invisible)
}

function parseMenu(subMenus: RouteRecordRaw[], parentPath = '') {
  const visibleMenus = filterVisibleMenu(subMenus)

  const results: Menu[] = []

  visibleMenus.forEach((item) => {
    const { name, children = [], meta, path } = item

    const isStartWithSlash = /^\//.test(path)

    const realPath = isStartWithSlash ? path : `${parentPath}/${path}`

    const result: Menu = {
      name: meta?.title || (name as string) || '暂无Name',
      path: realPath,
      icon: meta?.icon
    }

    const visibleChildren = filterVisibleMenu(children)
    if (visibleChildren.length) {
      result.children = parseMenu(children, realPath)
    }

    results.push(result)
  })

  return results
}

export const parseRoutesToMenu = (routers: RouteRecord[]) => {
  const root = routers.filter((item) => item.path === '/')
  if (root.length) {
    const children: RouteRecordRaw[] = []

    root.forEach((item) => {
      children.push(...item.children)
    })

    return parseMenu(children)
  }
}
