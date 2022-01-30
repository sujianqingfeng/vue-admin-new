import { fetchUploadApi } from '@/apis/common'
import type { AxiosRequestConfig } from 'axios'

type UploadParams = {
  file: File
  config?: AxiosRequestConfig
}

const generateFormData = (file: File) => {
  const data = new FormData()
  data.append('file', file)
  return data
}

export const uploadFile = ({ file, config }: UploadParams) => {
  const data = generateFormData(file)

  return fetchUploadApi(data, config)
}
