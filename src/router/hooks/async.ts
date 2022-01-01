import { Router } from 'vue-router'
import { useSetting } from '@/hooks'
import { useAccountStore } from '@/store/modules/account'
import { info } from '@/utils/log'
import { addRoutes, parseRoute, parseRoutesToMenu } from '../utils'

export const useAsyncRoute = (router: Router) => {
  const { asyncRouter } = useSetting()
  const accountStore = useAccountStore()

  const loadAsyncRoute = () => {
    // 异步路由模式
    if (asyncRouter.value) {
      const asyncRoutes = parseRoute(accountStore.routeConfigs)
      info('异步路由加载模式，路由：', asyncRoutes)
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
