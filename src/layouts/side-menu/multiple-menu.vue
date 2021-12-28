<script lang="ts" setup>
  import { defineProps, PropType } from 'vue'
  import { Menu } from '@/types/account'
  import { useRouter } from 'vue-router'
  import { useMenuKeys } from './hooks/useMenuKeys'
  import { useMultipleSubMenu } from './hooks/useMultipleSubMenu'

  type MenuItem = {
    key: string
  }

  const props = defineProps({
    menus: {
      type: Array as PropType<Menu[]>,
      default: () => []
    }
  })

  const { MultipleSubMenu } = useMultipleSubMenu(props.menus)

  const { selectedKeys, openKeys } = useMenuKeys()

  const router = useRouter()
  const onMenuClick = ({ key: path }: MenuItem) => {
    router.push(path)
  }
</script>

<template>
  <a-menu v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys" mode="inline" @click="onMenuClick">
    <multiple-sub-menu />
  </a-menu>
</template>
