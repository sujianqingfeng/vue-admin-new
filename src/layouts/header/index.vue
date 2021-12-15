<script setup lang="ts">
  import LayoutTrigger from './trigger.vue'
  import Avatar from './avatar.vue'
</script>

<template>
  <a-layout-header class="layout-header">
    <div class="left">
      <layout-trigger></layout-trigger>
    </div>

    <div class="action">
      <avatar></avatar>
    </div>
  </a-layout-header>
</template>

<style lang="less" scoped>
  .layout-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 48px;
    line-height: 48px;
    background-color: white;
  }
</style>
