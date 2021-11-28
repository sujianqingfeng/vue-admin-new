import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

const axiosInstance = axios.create({
  baseURL: BASE_URL
})

export const request = {
  get(url: string, params?: object) {
    return axiosInstance.get(url, { params })
  },
  post(url: string, data: object) {
    return axiosInstance.post(url, data)
  },
  postText(url: string, text: string) {
    return axiosInstance.post(url, text, {
      headers: {
        'Content-Type': 'text/plain'
      }
    })
  }
}
