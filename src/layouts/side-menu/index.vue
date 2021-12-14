<script setup lang="ts">
  import { useAccount, useSetting } from '@/hooks'

  import MultipleMenu from './multiple-menu.vue'

  const { getCollapsed, getThemeMode } = useSetting()

  const { menus } = useAccount()
</script>

<template>
  <a-layout-sider :theme="getThemeMode" :collapsed="getCollapsed" :trigger="null" collapsible>
    <multiple-menu :menus="menus"></multiple-menu>
  </a-layout-sider>
</template>
