import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { notification } from 'ant-design-vue'

const createAxios = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create(config)

  return {
    useResponseInterceptor<T = AxiosResponse>(onFulfilled?: (value: AxiosResponse) => T | Promise<T>, onRejected?: (error: any) => any) {
      axiosInstance.interceptors.response.use(onFulfilled, onRejected)
    },

    useRequestInterceptor<T = AxiosRequestConfig>(onFulfilled?: (value: AxiosRequestConfig) => T | Promise<T>, onRejected?: (error: any) => any) {
      axios.interceptors.request.use(onFulfilled, onRejected)
    },

    get<R = any, T = any>(url: string, params?: object, config?: AxiosRequestConfig) {
      return axiosInstance.get<T, R>(url, { params, ...config })
    },
    post<R = any, T = any>(url: string, data: object, config?: AxiosRequestConfig) {
      return axiosInstance.post<T, R>(url, data, config)
    },
    postText(url: string, text: string) {
      return axiosInstance.post(url, text, {
        headers: {
          'Content-Type': 'text/plain'
        }
      })
    }
  }
}

type BaseResponse<T = unknown> = {
  code: number
  message?: string
  data?: T
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL

const rejectError = (message: string | undefined) => {
  notification.error({ message })
  return Promise.reject(new Error(message))
}

const request = createAxios({ baseURL: BASE_URL })

// 请求拦截器
request.useRequestInterceptor()
// 响应拦截器
request.useResponseInterceptor((res: AxiosResponse<BaseResponse>) => {
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

export { request }
