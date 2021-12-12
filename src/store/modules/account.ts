import { defineStore } from 'pinia'
import type { Account } from '@/types/account'
import { RouteConfig } from '@/types/route'

export const useAccountStore = defineStore('account', {
  state: (): Account => {
    const routerConfig = localStorage.getItem(import.meta.env.VITE_ROUTE_KEY) || '[]'

    return {
      routeConfig: JSON.parse(routerConfig) as RouteConfig[]
    }
  },
  actions: {}
})
