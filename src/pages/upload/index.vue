<script lang="ts" setup>
  import Upload from '@/components/upload/upload-file.vue'
</script>

<template>
  <upload name="file" :multiple="true" action="https://www.mocky.io/v2/5cc8019d300000980a055e76">
    <a-button> Click to Upload </a-button>
  </upload>
</template>
