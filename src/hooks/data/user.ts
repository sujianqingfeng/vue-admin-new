import { fetchLoginApi, fetchRoutesApi, UserProfile } from '@/apis/user'
import { useAsyncRoute } from '@/router/hooks/async'
import { useAccountStore } from '@/store/modules/account'
import { setToken, setUserInfo } from '@/utils/data-store'
import { useRouter } from 'vue-router'

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

  const afterLogin = async ({ token, avatar }: UserProfile) => {
    setToken(token)
    setUserInfo({ avatar })

    await fetchUserRoutes()
    router.push('/')
  }

  return { fetchUserLogin }
}
