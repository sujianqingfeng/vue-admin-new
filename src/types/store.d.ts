import type { RouteConfig } from './route'

export type Setting = {
  asyncRouter: boolean
  collapsed: boolean
  themeMode: 'light' | 'dark' | 'night'
  menuWidth: number
  menuCollapseWidth: number
}

export type Account = {
  routeConfigs: RouteConfig[]
  menus: Menu[]
} & User

export type User = {
  avatar: string
}

export type Menu = {
  name: string
  path: string
  icon?: string
  children?: Menu[]
}
