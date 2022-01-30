<script lang="ts" setup>
  import { withDefaults, defineProps, defineEmits } from 'vue'
  import { InboxOutlined } from '@ant-design/icons-vue'

  // TODO 现在vue还没有修复这个问题
  // import type { IUploadProps, IUploadEmits } from './hooks/use-upload'
  import { useUpload, UploadFile } from './hooks/use-upload'

  export type IUploadProps = {
    maxSize?: number
    modelValue?: any[]
  }
  export type IUploadEmits = {
    (event: 'update:modelValue', successList: UploadFile[]): void
  }

  const props = withDefaults(defineProps<IUploadProps>(), { maxSize: 8, modelValue: () => [] })
  const emit = defineEmits<IUploadEmits>()

  const { fileList, handleChange, customRequest } = useUpload(props, emit)
</script>

<template>
  <a-upload-dragger v-model:fileList="fileList" :custom-request="customRequest" @change="handleChange">
    <p class="ant-upload-drag-icon">
      <inbox-outlined></inbox-outlined>
    </p>
    <p class="ant-upload-text">Click or drag file to this area to upload</p>
    <p class="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
  </a-upload-dragger>
</template>
