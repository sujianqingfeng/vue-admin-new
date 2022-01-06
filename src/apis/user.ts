import { RouteConfig } from '@/types/route'
import { request } from '@/utils/request'

export type UserProfile = {
  token: string
  avatar: string
}

export const fetchLoginApi = (data: object) => request.post<UserProfile>('/user/login', data)

export const fetchRoutesApi = () => request.get<RouteConfig[]>('/user/routes')
