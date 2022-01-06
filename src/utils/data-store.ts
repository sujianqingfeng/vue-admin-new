import { RouteConfig } from '@/types/route'
import { User } from '@/types/store'

export enum DataStoreType {
  STRING,
  JSON,
  NUMBER
}

export class DataStore {
  static get(key: string, type: DataStoreType = DataStoreType.STRING) {
    const value = localStorage.getItem(key)
    if (value) {
      switch (type) {
        case DataStoreType.JSON:
          return JSON.parse(value)

        case DataStoreType.NUMBER:
          return Number(value)

        default:
          return value
      }
    }
  }

  static set(key: string, value: any, type: DataStoreType = DataStoreType.STRING) {
    if (type === DataStoreType.JSON) {
      localStorage.setItem(key, JSON.stringify(value))
      return
    }

    localStorage.setItem(key, value)
  }
}

// 路由配置
const ROUTE_KEY = import.meta.env.VITE_ROUTE_KEY
export const getRouteConfigs = () => (DataStore.get(ROUTE_KEY, DataStoreType.JSON) as RouteConfig[]) || []
export const setRouteConfigs = (configs: RouteConfig[]) => DataStore.set(ROUTE_KEY, configs, DataStoreType.JSONj)

// 用户信息
const USER_KEY = import.meta.env.VITE_USER_KEY
export const getUserInfo = () => DataStore.get(USER_KEY, DataStoreType.JSON) as User
export const setUserInfo = (user: User) => DataStore.set(USER_KEY, user, DataStoreType.JSON)

// Token
const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY
export const getToken = () => DataStore.get(TOKEN_KEY)
export const setToken = (token: string) => DataStore.set(TOKEN_KEY, token)
