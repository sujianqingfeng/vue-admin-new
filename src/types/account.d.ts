import type { RouteConfig } from './route'

export type Account = {
  routeConfigs: RouteConfig[]
  menus: Menu[]
}

export type Menu = {
  name: string
  path:string
  icon?: string
  children?: Menu[]
}
