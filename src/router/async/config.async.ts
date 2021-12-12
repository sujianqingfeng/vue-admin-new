import type { RouteConfig } from '@/types/route'
import { parseRoute } from '../utils'

const routerConfigs: RouteConfig[] = [
  {
    name: 'root',
    children: [
      {
        name: 'dashboard'
      }
    ]
  }
]

export default parseRoute(routerConfigs)
