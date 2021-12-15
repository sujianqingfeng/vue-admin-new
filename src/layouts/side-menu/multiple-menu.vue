<script lang="ts" setup>
  import { defineProps, PropType, h } from 'vue'
  import { SubMenu, MenuItem } from 'ant-design-vue'
  import { Menu } from '@/types/account'
  import { getIconComponent } from '@/settings'
  import { useRouter } from 'vue-router'

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
  const MultipleSubMenu = () => renderSubMenu(props.menus)

  const router = useRouter()
  const onMenuClick = ({ key: path }: any) => {
    router.push(path)
  }
</script>

<template>
  <a-menu mode="inline" @click="onMenuClick">
    <multiple-sub-menu />
  </a-menu>
</template>
