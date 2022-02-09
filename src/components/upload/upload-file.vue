<script lang="ts" setup>
  import { withDefaults, defineProps, defineEmits } from 'vue'
  import { InboxOutlined } from '@ant-design/icons-vue'
  import { UploadDragger } from 'ant-design-vue'

  // TODO 现在vue还没有支持这个特性 现在是有问题的
  // import type { IUploadProps, IUploadEmits } from './hooks/use-upload'
  import { useUpload, UploadFile } from './hooks/use-upload'

  type IUploadProps = {
    maxSize?: number
    modelValue?: any
  }

  type IUploadEmits = {
    (event: 'update:modelValue', successList: UploadFile[]): void
  }

  const props = withDefaults(defineProps<IUploadProps>(), { maxSize: 8, modelValue: () => [] })
  const emit = defineEmits<IUploadEmits>()

  const { fileList, handleChange, customRequest, beforeUpload } = useUpload(props, emit)
</script>

<template>
  <upload-dragger v-model:fileList="fileList" :custom-request="customRequest" :before-upload="beforeUpload" @change="handleChange">
    <slot>
      <p class="ant-upload-drag-icon">
        <inbox-outlined></inbox-outlined>
      </p>
      <p class="ant-upload-text">Click or drag file to this area to upload</p>
      <p class="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
    </slot>
  </upload-dragger>
</template>
