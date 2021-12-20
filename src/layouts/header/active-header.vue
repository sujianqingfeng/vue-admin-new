<script setup lang="ts">
  import LayoutTrigger from './trigger.vue'
  import Avatar from './avatar.vue'
  import { useBreadcrumb } from './hooks/useBreadcrumb'

  const { breadcrumbs } = useBreadcrumb()
</script>

<template>
  <a-layout-header class="layout-header">
    <div class="left">
      <layout-trigger></layout-trigger>

      <a-breadcrumb :routes="breadcrumbs">
        <template #itemRender="{ route, routes }">
          <span v-if="routes.indexOf(route) === routes.length - 1">
            {{ route.title }}
          </span>
          <router-link v-else to=""> {{ route.title }} </router-link>
        </template>
      </a-breadcrumb>
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
