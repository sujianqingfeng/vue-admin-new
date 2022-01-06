import { defineStore } from 'pinia'
import type { Account, Menu } from '@/types/store'
import { RouteConfig } from '@/types/route'
import { getRouteConfigs, getUserInfo, setRouteConfigs } from '@/utils/data-store'

export const useAccountStore = defineStore('account', {
  state: (): Account => {
    return {
      routeConfigs: getRouteConfigs(),
      menus: [],
      ...getUserInfo()
    }
  },
  actions: {
    setRouteConfigs(configs: RouteConfig[]) {
      this.routeConfigs = configs
      setRouteConfigs(configs)
    },
    setMenus(menus: Menu[]) {
      this.menus = menus
    }
  }
})
