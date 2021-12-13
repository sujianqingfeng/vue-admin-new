import type { RouteRecordName } from 'vue-router'
import type { RouteConfig } from './route'

export type Account = {
  routeConfig: RouteConfig[]
}

export type Menu = {
  name: RouteRecordName
  children?: Menu[]
}
