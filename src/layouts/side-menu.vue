<script setup lang="ts">
  import { defineProps } from 'vue'
  defineProps({
    themeMode: {
      type: String,
      default: ''
    }
  })
</script>

<template>
  <a-layout-sider :theme="themeMode"> side-menu </a-layout-sider>
</template>
