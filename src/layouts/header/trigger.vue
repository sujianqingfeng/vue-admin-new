<script setup lang="ts">
  import { useSetting } from '@/hooks'
  import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'

  const { collapsed, toggleCollapsed } = useSetting()
</script>

<template>
  <span class="menu-trigger" @click="toggleCollapsed">
    <MenuUnfoldOutlined v-if="collapsed" />
    <MenuFoldOutlined v-else />
  </span>
</template>

<style lang="less" scoped>
  .menu-trigger {
    padding: 1px 10px 0;
  }
</style>
