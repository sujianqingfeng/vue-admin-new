import { App, DirectiveBinding, Plugin } from 'vue'
import { usePermissionStoreWithOut } from '@/store/modules/permission'

const permissionStore = usePermissionStoreWithOut()

function hostRemove(el: HTMLElement) {
  const parent = el.parentNode
  if (parent) {
    parent.removeChild(el)
  }
}

function checkPermission(el: HTMLElement, binding: DirectiveBinding) {
  const { arg, value } = binding
  if (arg) {
    const isExist = permissionStore.hasPermission(arg, value)
    if (!isExist) {
      hostRemove(el)
    }
  }
}

export const PermissionPlugin: Plugin = {
  install: (app: App) => {
    app.directive('permission', {
      mounted: checkPermission,
      updated: checkPermission
    })
  }
}
