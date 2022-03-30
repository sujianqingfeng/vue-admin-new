import { usePermissionStore } from '@/store/modules/permission'
import { message } from 'ant-design-vue'

type Option = {
  code: string
  values?: string | string[]
  msg?: string
}

export function usePermissionFn(cb: (...arg: any) => void, { code, values, msg = '没有权限操作' }: Option): (..._: any) => void {
  const permissionStore = usePermissionStore()

  return (...args) => {
    const isExist = permissionStore.hasPermission(code, values)
    if (!isExist) {
      message.info(msg)
      return
    }

    cb(...args)
  }
}
