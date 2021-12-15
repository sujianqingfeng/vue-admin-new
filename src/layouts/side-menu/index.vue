<script setup lang="ts">
  import { useAccount, useSetting } from '@/hooks'

  import MultipleMenu from './multiple-menu.vue'

  const { getCollapsed, getThemeMode } = useSetting()

  const { menus } = useAccount()
</script>

<template>
  <a-layout-sider class="layout-sider" :theme="getThemeMode" :collapsed="getCollapsed" :trigger="null" collapsible>
    <multiple-menu :menus="menus"></multiple-menu>
  </a-layout-sider>
</template>

<style lang="less">
  .layout-sider {
    position: fixed;
    height: 100vh;
    top: 0;
    left: 0;
  }
</style>
