<script setup lang="ts">
  import { computed, CSSProperties, unref } from 'vue'
  import { useAccount, useSetting } from '@/hooks'

  import MultipleMenu from './multiple-menu.vue'

  const { collapsed, themeMode, menuWidth } = useSetting()
  const { menus } = useAccount()

  const holderStyle = computed((): CSSProperties => {
    const width = unref(menuWidth) + 'px'

    return {
      width,
      flex: '0 0 ' + width,
      maxWidth: width,
      minWidth: width,
      transition: 'all ease .3s'
    }
  })
</script>

<template>
  <div :style="holderStyle"></div>
  <a-layout-sider class="layout-sider" :style="holderStyle" :theme="themeMode" :collapsed="collapsed" :trigger="null" collapsible>
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
