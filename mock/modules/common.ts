import { MockMethod } from 'vite-plugin-mock'
import { successResponse } from '../utils'
import Mock from 'mockjs'

const Random = Mock.Random

export default [
  {
    url: '/api/common/upload',
    method: 'post',
    response: ({ body }) => {
      return successResponse({
        url: Random.image()
      })
    }
  }
] as MockMethod[]
