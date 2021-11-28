import { request } from '@/utils/request'

export const fetchLoginApi = (data: object) => request.post('/login', data)
