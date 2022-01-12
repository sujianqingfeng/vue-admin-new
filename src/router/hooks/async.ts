import { unref } from 'vue'
import { Router } from 'vue-router'
import { storeToRefs } from 'pinia'

import { useAccountStore } from '@/store/modules/account'
import { info } from '@/utils/log'
import { addRoutes, parseRoute, parseRoutesToMenu } from '../utils'

import { localAsyncRouteConfigs } from '../async/config.async'
import { deepMerge } from '@/utils/share'
import { useSettingStore } from '@/store/modules/setting'

export const useAsyncRoute = (router: Router) => {
  const { asyncRouter } = storeToRefs(useSettingStore())

  const accountStore = useAccountStore()

  const loadAsyncRoute = () => {
    // 异步路由模式
    if (unref(asyncRouter)) {
      const routeConfigs = deepMerge(localAsyncRouteConfigs, accountStore.routeConfigs)

      const asyncRoutes = parseRoute(routeConfigs)

      info('异步路由加载模式，最终路由：', asyncRoutes)
      addRoutes(router, asyncRoutes)
    }

    parseRouteToMenuAndSave()
  }

  const parseRouteToMenuAndSave = () => {
    const menus = parseRoutesToMenu(router.getRoutes())
    info('生成菜单数据:', menus)
    if (menus) {
      accountStore.setMenus(menus)
    }
  }

  return { loadAsyncRoute }
}
