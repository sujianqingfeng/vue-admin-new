import { fetchLoginApi, fetchRoutesApi, UserProfile } from '@/apis/user'
import { addRoutes, mergeRoute, parseRoute } from '@/router/utils'
import { DataStore } from '@/utils/data-store'
import { useRouter } from 'vue-router'

const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY

export const useUserLogin = () => {
  const router = useRouter()

  const fetchUserLogin = async (info: object) => {
    const userProfile = await fetchLoginApi(info)
    return afterLogin(userProfile)
  }

  const fetchUserRoutes = async () => {
    const routesConfigs = await fetchRoutesApi()

    const routes = parseRoute(routesConfigs)
    console.log('routes', routes)

    const finalRoutes = mergeRoute(router, routes)

    console.log('routers', finalRoutes)

    addRoutes(router, finalRoutes)

    console.log('router', router)
  }

  const afterLogin = (userProfile: UserProfile) => {
    DataStore.set(TOKEN_KEY, userProfile.token)

    fetchUserRoutes()

    return Promise.resolve()
  }

  return { fetchUserLogin }
}
