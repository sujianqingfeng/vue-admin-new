import { fetchLoginApi, UserProfile } from '@/apis/user'
import { DataStore } from '@/utils/data-store'

const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY

export const useUserLogin = () => {
  const fetchUserLogin = async (info: object) => {
    const userProfile = await fetchLoginApi(info)
    return afterLogin(userProfile)
  }

  const afterLogin = (userProfile: UserProfile) => {
    DataStore.set(TOKEN_KEY, userProfile.token)

    return Promise.resolve()
  }

  return { fetchUserLogin }
}
