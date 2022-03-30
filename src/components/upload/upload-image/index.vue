<script lang="ts" setup>
  import { withDefaults, defineProps, defineEmits, ref } from 'vue'
  import { Upload } from 'ant-design-vue'
  import { CropperModal, ICropperModalInstance } from './cropper-modal'
  import { PlusOutlined } from '@ant-design/icons-vue'
  import { useUpload, UploadFile, FileType } from '../hooks/use-upload'

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

  const cropperModalRef = ref<ICropperModalInstance>()

  const { fileList, handleChange, customRequest, beforeUpload: basicBeforeUpload } = useUpload(props, emit)

  const beforeUpload = (file: FileType, fileList: FileType[]) => {
    const result = basicBeforeUpload(file, fileList)
    // 返回值只有2种情况 一个是Boolean 一个是Promise 判断为object 就是promise
    if (typeof result === 'object') {
      return result
    }

    // 裁剪
    if (props.isCrop) {
      return cropperModalRef.value!.show({
        file,
        options: {
          aspectRatio: props.aspectRatio
        }
      })
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

    <cropper-modal ref="cropperModalRef"></cropper-modal>
  </div>
</template>
