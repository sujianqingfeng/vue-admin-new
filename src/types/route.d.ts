import { RouteRecordRaw } from 'vue-router'

export type RouteConfig = {
  name: string
  children?: RouteConfig[]
}

export type RouteMap = {
  [key: string]: RouteRecordRaw
}
