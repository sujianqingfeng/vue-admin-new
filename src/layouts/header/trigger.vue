<script setup lang="ts">
  import { useSetting } from '@/hooks'
  import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
  import Ripple from '@/components/ripple/index.vue'

  const { collapsed, toggleCollapsed } = useSetting()
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
