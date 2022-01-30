<script lang="ts" setup>
  import { useTabStore } from '@/store/modules/tab'
  import { storeToRefs } from 'pinia'

  const { caches } = storeToRefs(useTabStore())
</script>

<template>
  <a-layout-content class="layout-content m-4">
    <router-view v-slot="{ Component }">
      <keep-alive :include="caches">
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
  </a-layout-content>
</template>

<style lang="less" scoped>
  .layout-content {
    min-height: 500px;
  }
</style>
