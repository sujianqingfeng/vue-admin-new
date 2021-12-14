import { defineStore } from 'pinia'
import type { Account, Menu } from '@/types/account'
import { RouteConfig } from '@/types/route'
import { getLocalStorage, setLocalStorage } from '@/utils/share'

const ROUTE_KEY = import.meta.env.VITE_ROUTE_KEY

export const useAccountStore = defineStore('account', {
  state: (): Account => {
    return {
      routeConfigs: getLocalStorage<RouteConfig[]>(ROUTE_KEY, []),
      menus: []
    }
  },
  actions: {
    setRouteConfigs(configs: RouteConfig[]) {
      this.routeConfigs = configs
      setLocalStorage(ROUTE_KEY, configs)
    },
    setMenus(menus: Menu[]) {
      this.menus = menus
    }
  }
})
