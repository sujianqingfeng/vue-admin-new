import type { RouteConfig } from './route'

export type Account = {
  routeConfigs: RouteConfig[]
  menus: Menu[]
}

export type Menu = {
  name: string
  icon?: string
  children?: Menu[]
}
