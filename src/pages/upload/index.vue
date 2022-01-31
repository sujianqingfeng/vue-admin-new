<script lang="ts" setup>
  import UploadFile from '@/components/upload/upload-file.vue'
  import { ref } from 'vue'

  const files = ref('http://dummyimage.com/728x90')
</script>

<template>
  vModel : {{ files }}
  <div class="w-100">
    <upload-file v-model="files"> </upload-file>
  </div>
</template>
