import axios, { AxiosResponse } from 'axios'
import { notification } from 'ant-design-vue'

type BaseResponse<T = unknown> = {
  code: number
  message?: string
  data?: T
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL

const axiosInstance = axios.create({
  baseURL: BASE_URL
})

const rejectError = (message: string | undefined) => {
  notification.error({ message })
  return Promise.reject(new Error(message))
}

axiosInstance.interceptors.response.use((res: AxiosResponse<BaseResponse>) => {
  const { status, data } = res
  if (status === 200) {
    const { code, data: d, message } = data
    if (code === 200) {
      return Promise.resolve(d)
    }

    return rejectError(message)
  }
  const message = `status:${status}`
  return rejectError(message)
})

export const request = {
  get<R = any, T = any>(url: string, params?: object) {
    return axiosInstance.get<T, R>(url, { params })
  },
  post<R = any, T = any>(url: string, data: object) {
    return axiosInstance.post<T, R>(url, data)
  },
  postText(url: string, text: string) {
    return axiosInstance.post(url, text, {
      headers: {
        'Content-Type': 'text/plain'
      }
    })
  }
}
