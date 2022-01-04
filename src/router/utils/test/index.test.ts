import { RouteConfig } from '@/types/route'
import { expect, describe, it } from 'vitest'
import { parseRoute } from '..'

describe('parseRoute', () => {
  it('test', () => {
    const configs: RouteConfig[] = [
      {
        name: 'root',
        children: [
          {
            name: 'table'
          }
        ]
      },
      {
        name: 'root',
        children: [
          {
            name: 'upload'
          }
        ]
      }
    ]

    const result = parseRoute(configs)

    console.log(111, JSON.stringify(result))
  })
})
