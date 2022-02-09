<script lang="ts" setup>
  import { withDefaults, defineProps, defineEmits } from 'vue'
  import { Upload } from 'ant-design-vue'
  import { PlusOutlined } from '@ant-design/icons-vue'
  import { useUpload, UploadFile } from './hooks/use-upload'

  type IUploadProps = {
    modelValue?: any
    maxSize?: number
    isCrop?: boolean
    count?: number
    aspectRatio?: number
  }

  type IUploadEmits = {
    (event: 'update:modelValue', successList: UploadFile[]): void
  }

  const props = withDefaults(defineProps<IUploadProps>(), { modelValue: () => [], maxSize: 8, isCrop: false, count: 8, aspectRatio: 1 })
  const emit = defineEmits<IUploadEmits>()

  const { fileList, handleChange, customRequest, beforeUpload: basicBeforeUpload } = useUpload(props, emit)

  const beforeUpload = (file: Required<UploadFile>, fileList: UploadFile[]) => {
    const result = basicBeforeUpload(file, fileList)
    // 返回值只有2种情况 一个是Boolean 一个是Promise 判断为object 就是promise
    if (typeof result === 'object') {
      return result
    }

    // 裁剪
    if (props.isCrop) {
      return false
    }
    return true
  }
</script>

<template>
  <div>
    <upload v-model:fileList="fileList" list-type="picture-card" :custom-request="customRequest" :before-upload="beforeUpload" @change="handleChange">
      <div v-if="fileList.length < 8">
        <plus-outlined />
        <div class="ant-upload-text">Upload</div>
      </div>
    </upload>
  </div>
</template>
