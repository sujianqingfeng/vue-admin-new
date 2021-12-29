import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/user/login',
    method: 'post',
    response: ({ body }) => {
      return {
        code: 0,
        message: 'ok',
        data: null
      }
    }
  }
] as MockMethod[]
