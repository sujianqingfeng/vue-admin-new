<script lang="ts" setup>
  import { defineProps, PropType, h } from 'vue'
  import { SubMenu, MenuItem } from 'ant-design-vue'
  import { Menu } from '@/types/account'
  import { getIconComponent } from '@/settings'

  const props = defineProps({
    menus: {
      type: Array as PropType<Menu[]>,
      default: () => []
    }
  })

  const renderIcon = (icon: string | undefined) => {
    if (icon) {
      const iconComponent = getIconComponent(icon)
      return h(iconComponent)
    }
    return null
  }

  const renderSubMenu = (menus: Menu[]) => {
    return menus.map((menu) => {
      const { name, children, icon } = menu

      if (children) {
        return h(
          SubMenu,
          {},
          {
            title: () => name,
            icon: () => renderIcon(icon),
            default: () => renderSubMenu(children)
          }
        )
      }

      return h(MenuItem, {}, { default: () => name, icon: () => renderIcon(icon) })
    })
  }

  // functional component
  const MultipleSubMenu = () => renderSubMenu(props.menus)
</script>

<template>
  <a-menu mode="inline">
    <multiple-sub-menu />
  </a-menu>
</template>
