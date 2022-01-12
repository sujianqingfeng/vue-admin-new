import { defineStore } from 'pinia'
import type { Account, Menu, User } from '@/types/store'
import { RouteConfig } from '@/types/route'
import { getRouteConfigs, getUserInfo, setUserInfo, setRouteConfigs } from '@/utils/data-store'

export const useAccountStore = defineStore('account', {
  state: (): Account => {
    return {
      routeConfigs: getRouteConfigs(),
      menus: [],
      user: getUserInfo()
    }
  },
  actions: {
    setRouteConfigs(configs: RouteConfig[]) {
      this.routeConfigs = configs
      setRouteConfigs(configs)
    },
    setMenus(menus: Menu[]) {
      this.menus = menus
    },
    setUserInfo(user: User) {
      this.user = user
      setUserInfo(user)
    }
  }
})
