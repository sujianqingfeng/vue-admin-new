<script setup lang="ts">
  import { useAccount, useSetting } from '@/hooks'

  import HolderSide from './holder-side.vue'
  import MultipleMenu from './multiple-menu.vue'
  import LogoInfo from './logo-info.vue'

  const { collapsed, themeMode, menuWidth, menuCollapseWidth } = useSetting()
  const { menus } = useAccount()
</script>

<template>
  <holder-side />
  <a-layout-sider
    class="layout-sider"
    :width="menuWidth"
    :collapsed-width="menuCollapseWidth"
    :theme="themeMode"
    :collapsed="collapsed"
    :trigger="null"
    collapsible
  >
    <logo-info />
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
