import { fetchLoginApi, fetchRoutesApi, UserProfile } from '@/apis/user'
import { useAsyncRoute } from '@/router/hooks/async'
import { useAccountStore } from '@/store/modules/account'
import { DataStore } from '@/utils/data-store'
import { useRouter } from 'vue-router'

const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY

export const useUserLogin = () => {
  const router = useRouter()

  const { setRouteConfigs } = useAccountStore()
  const { loadAsyncRoute } = useAsyncRoute(router)

  const fetchUserLogin = async (info: object) => {
    const userProfile = await fetchLoginApi(info)
    return afterLogin(userProfile)
  }

  const fetchUserRoutes = async () => {
    const routeConfigs = await fetchRoutesApi()
    setRouteConfigs(routeConfigs)
    loadAsyncRoute()
  }

  const afterLogin = async (userProfile: UserProfile) => {
    DataStore.set(TOKEN_KEY, userProfile.token)
    await fetchUserRoutes()
    router.push('/')
  }

  return { fetchUserLogin }
}
