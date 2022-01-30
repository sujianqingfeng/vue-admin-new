<script lang="ts" setup>
  import UploadFile from '@/components/upload/upload-file.vue'
  import { ref } from 'vue'

  const files = ref([])
</script>

<template>
  vModel : {{ files }}
  <div class="w-100">
    <upload-file v-model="files"> ffff </upload-file>
  </div>
</template>
