<script lang="ts" setup>
  import { useTabStore } from '@/store/modules/tab'
  import { computed } from 'vue'

  const tabStore = useTabStore()

  const caches = computed(() => tabStore.caches)
</script>

<template>
  <a-layout-content class="layout-content">
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
