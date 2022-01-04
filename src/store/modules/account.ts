import { defineStore } from 'pinia'
import type { Account, Menu } from '@/types/account'
import { RouteConfig } from '@/types/route'
import { DataStore, DataStoreType } from '@/utils/data-store'

const ROUTE_KEY = import.meta.env.VITE_ROUTE_KEY
const TYPE = DataStoreType.JSON

const routeConfigs = (DataStore.get(ROUTE_KEY, TYPE) as RouteConfig[]) || []

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
      DataStore.set(ROUTE_KEY, configs, TYPE)
    },
    setMenus(menus: Menu[]) {
      this.menus = menus
    }
  }
})
