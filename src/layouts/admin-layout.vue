<script setup lang="ts">
  import SideMenu from './side-menu.vue'
  import LayoutHeader from './header/index.vue'
  import LayoutContent from './content/index.vue'
  import LayoutFooter from './footer/index.vue'
</script>
<template>
  <a-layout>
    <side-menu></side-menu>
    <a-layout>
      <layout-header></layout-header>
      <layout-content></layout-content>
      <layout-footer></layout-footer>
    </a-layout>
  </a-layout>
</template>
