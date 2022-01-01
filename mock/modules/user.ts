import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/user/login',
    method: 'post',
    response: ({ body }) => {
      console.log(body)

      const { account, password } = body

      if (account === 'admin' && password === 'admin') {
        return {
          code: 200,
          data: {
            token: 'ffff'
          }
        }
      }

      return {
        code: 401,
        message: '密码错误'
      }
    }
  },
  {
    url: '/api/user/routes',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: [
          {
            name: 'root',
            children: [
              {
                name: 'dashboard'
              },
              {
                name: 'table'
              }
            ]
          }
        ]
      }
    }
  }
] as MockMethod[]
