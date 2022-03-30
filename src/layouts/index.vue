<script setup lang="ts">
  import { Layout } from 'ant-design-vue'

  import SideMenu from './side-menu/index.vue'
  import AppHeader from './header/index.vue'
  import AppContent from './content/index.vue'
  import AppFooter from './footer/index.vue'
</script>

<template>
  <layout>
    <side-menu></side-menu>
    <layout>
      <app-header></app-header>
      <app-content></app-content>
      <app-footer></app-footer>
    </layout>
  </layout>
</template>
