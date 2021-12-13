import { defineStore } from 'pinia'
import type { Account } from '@/types/account'
import { RouteConfig } from '@/types/route'
import { getLocalStorage, setLocalStorage } from '@/utils/share'

const ROUTE_KEY = import.meta.env.VITE_ROUTE_KEY

export const useAccountStore = defineStore('account', {
  state: (): Account => {
    return {
      routeConfig: getLocalStorage<RouteConfig[]>(ROUTE_KEY, [])
    }
  },
  actions: {
    setRouteConfig(config: RouteConfig[]) {
      this.routeConfig = config
      setLocalStorage(ROUTE_KEY, config)
    }
  }
})
