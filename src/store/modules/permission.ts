import { defineStore } from 'pinia'

import { store } from '@/store'

type PermissionState = {
  permissions: {
    [key: string]: string[]
  }
}

export const usePermissionStore = defineStore('permission', {
  state: (): PermissionState => {
    return {
      permissions: {
        menu: ['delete', 'edit']
      }
    }
  },
  actions: {
    hasPermission(key: string, values: string | string[] = '') {
      const permission = this.permissions[key]

      if (permission) {
        if (values) {
          if (typeof values === 'string') {
            if (/,/.test(values)) {
              return values.split(',').some((value) => permission.includes(value))
            } else {
              return permission.includes(values)
            }
          } else if (Array.isArray(values)) {
            return values.some((value) => permission.includes(value))
          }
        } else {
          // 如何存在 key,但是不存在values 则认为存在此权限
          return true
        }
      }

      return false
    }
  }
})

export function usePermissionStoreWithOut() {
  return usePermissionStore(store)
}
