<script setup lang="ts">
  import { useSettingStore } from '@/store/modules/setting'
  import SideMenu from './side-menu.vue'

  const setting = useSettingStore()
</script>
<template>
  <a-layout>
    <side-menu :theme-mode="setting.theme.mode"></side-menu>
    <a-layout>
      <a-layout-header>Header</a-layout-header>
      <a-layout-content>Content</a-layout-content>
      <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
  </a-layout>
</template>
