import { h } from 'vue'
import type { Menu } from '@/types/account'
import { SubMenu, MenuItem } from 'ant-design-vue'
import { getIconComponent } from '@/settings'

export function useMultipleSubMenu(menus: Menu[]) {
  const renderIcon = (icon: string | undefined) => {
    if (icon) {
      const iconComponent = getIconComponent(icon)
      return h(iconComponent)
    }
    return null
  }

  const renderSubMenu = (menus: Menu[]) => {
    return menus.map((menu) => {
      const { name, children, icon, path } = menu

      if (children) {
        return h(
          SubMenu,
          { key: path },
          {
            title: () => name,
            icon: () => renderIcon(icon),
            default: () => renderSubMenu(children)
          }
        )
      }

      return h(MenuItem, { key: path }, { default: () => name, icon: () => renderIcon(icon) })
    })
  }

  // functional component
  const MultipleSubMenu = () => renderSubMenu(menus)

  return {
    MultipleSubMenu
  }
}
