<script setup lang="ts">
  import Ripple from '@/components/ripple/index.vue'
  import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
  import { useSettingStore } from '@/store/modules/setting'
  import { storeToRefs } from 'pinia'

  const settingStore = useSettingStore()
  const { toggleCollapsed } = settingStore

  const { collapsed } = storeToRefs(settingStore)
</script>

<template>
  <ripple class="menu-trigger" @click="toggleCollapsed">
    <MenuUnfoldOutlined v-if="collapsed" />
    <MenuFoldOutlined v-else />
  </ripple>
</template>

<style lang="less" scoped>
  .menu-trigger {
    padding: 1px 10px 0;
  }
</style>
