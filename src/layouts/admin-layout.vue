<script setup lang="ts">
  import SideMenu from './side-menu.vue'
</script>
<template>
  <a-layout>
    <side-menu></side-menu>
    <a-layout>
      <a-layout-header>Header</a-layout-header>
      <a-layout-content>Content</a-layout-content>
      <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
  </a-layout>
</template>
