import { fetchLoginApi, fetchRoutesApi, UserProfile } from '@/apis/user'
import { parseRoute } from '@/router/utils'
import { DataStore } from '@/utils/data-store'

const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY

export const useUserLogin = () => {
  const fetchUserLogin = async (info: object) => {
    const userProfile = await fetchLoginApi(info)
    return afterLogin(userProfile)
  }

  const fetchUserRoutes = async () => {
    const routesConfigs = await fetchRoutesApi()

    const routers = parseRoute(routesConfigs)

    console.log('routers', routers)
  }

  const afterLogin = (userProfile: UserProfile) => {
    DataStore.set(TOKEN_KEY, userProfile.token)

    fetchUserRoutes()

    return Promise.resolve()
  }

  return { fetchUserLogin }
}
