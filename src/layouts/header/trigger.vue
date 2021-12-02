<script setup lang="ts">
  import { useSetting } from '@/hooks/setting'
  import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'

  const { getCollapsed, toggleCollapsed } = useSetting()
</script>

<template>
  <div @click="toggleCollapsed">
    <MenuUnfoldOutlined v-if="getCollapsed" />
    <MenuFoldOutlined v-else />
  </div>
</template>
