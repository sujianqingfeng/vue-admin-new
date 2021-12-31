import { request } from '@/utils/request'

export type UserProfile = {
  token: string
}

export const fetchLoginApi = (data: object) => request.post<UserProfile>('/user/login', data)
