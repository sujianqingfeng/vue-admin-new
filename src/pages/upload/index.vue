<script lang="ts" setup>
  import { UploadFile, UploadImage } from '@/components/upload'
  import { ref } from 'vue'

  const files = ref('http://dummyimage.com/728x90')
</script>

<template>
  upload-file组件： vModel : {{ files }}
  <div class="w-100">
    <upload-file v-model="files"> </upload-file>
  </div>

  upload-image组件：

  <upload-image is-crop />
</template>
