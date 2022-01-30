import { request } from '@/utils/request'
import { AxiosRequestConfig } from 'axios'

export const fetchUploadApi = (data: object, config?: AxiosRequestConfig) => request.post('/common/upload', data, config)
