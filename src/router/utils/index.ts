import { RouteRecordRaw, Router, RouteRecord } from 'vue-router'

import type { RouteConfig } from '@/types/route'

import { routeMap } from '../async/route.map'
import { warn } from '@/utils/log'
import { Menu } from '@/types/store'

/**
 * 解析路由
 *
 * @param configs
 * @returns
 */
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

/**
 * 添加路由
 *
 * @param router
 * @param routes
 */
export const addRoutes = (router: Router, routes: RouteRecordRaw[] = []) => {
  routes.forEach((route) => {
    router.addRoute(route)
  })
}

/**
 * 过滤不可见菜单
 *
 * @param menus
 * @returns
 */
function filterVisibleMenu(menus: RouteRecordRaw[]) {
  return menus.filter((item) => !item.meta?.invisible)
}

/**
 * 去掉重复菜单
 *
 * @param menus
 * @returns
 */
function filterRepeatMenu(menus: RouteRecordRaw[]) {
  const map = new Map<string, RouteRecordRaw>()

  for (const menu of menus) {
    const { path } = menu
    if (!map.has(path)) {
      map.set(path, menu)
    }
  }
  return Array.from(map.values())
}

/**
 * 从路由解析菜单
 *
 * @param subMenus
 * @param parentPath
 * @returns
 */
function parseMenu(subMenus: RouteRecordRaw[], parentPath = '') {
  const uniqueMenus = filterRepeatMenu(subMenus)
  const visibleMenus = filterVisibleMenu(uniqueMenus)

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

/**
 * 从/解析菜单
 *
 * @param routers
 * @returns
 */
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
