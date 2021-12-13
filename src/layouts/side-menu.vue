<script setup lang="ts">
  import { useSetting } from '@/hooks'

  const { getCollapsed, getThemeMode } = useSetting()
</script>

<template>
  <a-layout-sider :theme="getThemeMode" :collapsed="getCollapsed"> side-menu </a-layout-sider>
</template>
