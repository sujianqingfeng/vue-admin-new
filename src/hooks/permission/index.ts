import { usePermissionStore } from '@/store/modules/permission'
import { message } from 'ant-design-vue'

type Option = {
  key: string
  values?: string | string[]
  msg?: string
}

export function usePermissionFn(cb: Function, { key, values, msg = '没有权限操作' }: Option): Function {
  const permissionStore = usePermissionStore()

  return function () {
    const isExist = permissionStore.hasPermission(key, values)
    if (!isExist) {
      message.info(msg)
      return
    }

    cb.apply(null, arguments)
  }
}
