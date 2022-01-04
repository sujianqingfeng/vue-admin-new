import type { RouteConfig } from '@/types/route'

export const localAsyncRouteConfigs: RouteConfig[] = [
  {
    name: 'root',
    children: [
      {
        name: 'upload'
      }
    ]
  }
]
