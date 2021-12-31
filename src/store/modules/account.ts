import { defineStore } from 'pinia'
import type { Account, Menu } from '@/types/account'
import { RouteConfig } from '@/types/route'
import { DataStore, DataStoreType } from '@/utils/data-store'

const ROUTE_KEY = import.meta.env.VITE_ROUTE_KEY

const routeConfigs = (DataStore.get(ROUTE_KEY, DataStoreType.JSON) as RouteConfig[]) || []

export const useAccountStore = defineStore('account', {
  state: (): Account => {
    return {
      routeConfigs,
      menus: []
    }
  },
  actions: {
    setRouteConfigs(configs: RouteConfig[]) {
      this.routeConfigs = configs
      DataStore.set(ROUTE_KEY, configs)
    },
    setMenus(menus: Menu[]) {
      this.menus = menus
    }
  }
})
