<script setup lang="ts">
  import LayoutTrigger from './trigger.vue'
  import Avatar from './avatar.vue'
  import Breadcrumb from './breadcrumb.vue'
</script>

<template>
  <a-layout-header class="layout-header">
    <div class="left">
      <layout-trigger></layout-trigger>
      <breadcrumb />
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
    padding: 0;
    background-color: white;

    .left {
      display: flex;
      align-items: center;
    }
  }
</style>
