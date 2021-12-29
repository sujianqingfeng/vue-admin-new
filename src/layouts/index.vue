<script setup lang="ts">
  import SideMenu from './side-menu/index.vue'
  import AppHeader from './header/index.vue'
  import AppContent from './content/index.vue'
  import AppFooter from './footer/index.vue'
</script>
<template>
  <a-layout>
    <side-menu></side-menu>
    <a-layout>
      <app-header></app-header>
      <app-content></app-content>
      <app-footer></app-footer>
    </a-layout>
  </a-layout>
</template>
