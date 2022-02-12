<script lang="ts" setup>
  import { nextTick, ref, defineProps, defineEmits, defineExpose, withDefaults, watch, onUnmounted } from 'vue'
  import { Row, Col } from 'ant-design-vue'
  import type { UploadFile } from 'ant-design-vue/lib/upload/interface'
  import { Modal, IModalInstance } from '../../../modal'
  import Cropper from 'cropperjs'
  import { IShowConfig, ICropperModalInstance } from '.'

  const props = withDefaults(defineProps<{ aspectRatio?: number }>(), { aspectRatio: 1 })
  const emit = defineEmits<{ (event: 'confirm', file: UploadFile): void }>()

  const modalRef = ref<IModalInstance>()
  const imageRef = ref()
  let cropperInstance: Cropper | null = null
  const _aspectRatio = ref(props.aspectRatio)
  let tempFile: UploadFile | null = null
  let resolveCb: ((value: UploadFile) => void) | null = null
  let rejectCb: ((reject?: any) => void) | null = null

  const defaultOptions: Cropper.Options = {
    dragMode: 'move',
    aspectRatio: 1,
    checkCrossOrigin: false,
    cropBoxResizable: true,
    minCropBoxWidth: 150,
    minCropBoxHeight: 150,
    autoCropArea: 0.8
  }

  const fileToDataUri = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const render = new FileReader()
      render.addEventListener('load', () => {
        if (typeof render.result === 'string') {
          resolve(render.result)
        }
      })

      render.addEventListener('error', reject)
      render.readAsDataURL(file)
    })
  }

  const show = ({ file, options }: IShowConfig) => {
    return new Promise<UploadFile>((resolve, reject) => {
      resolveCb = resolve
      rejectCb = reject
      modalRef.value?.show()
      nextTick(() => {
        if (!cropperInstance) {
          const mergeOptions = { ...defaultOptions, ...options }
          cropperInstance = new Cropper(imageRef.value, mergeOptions)
        }

        if (options?.aspectRatio) {
          _aspectRatio.value = options?.aspectRatio
        }

        tempFile = file
        fileToDataUri(file.originFileObj).then((dataUri) => {
          cropperInstance?.replace(dataUri)
        })
      })
    })
  }

  watch(_aspectRatio, (val) => {
    cropperInstance?.setAspectRatio(val)
  })

  onUnmounted(() => {
    cropperInstance?.destroy()
  })

  const ok = () => {
    if (!cropperInstance) {
      return console.error(`cropper instance is null`)
    }

    cropperInstance.getCroppedCanvas().toBlob((blob) => {
      if (blob && tempFile) {
        const { type, name, uid } = tempFile
        const file = new File([blob], name, { type })

        const newFile: UploadFile = {
          originFileObj: file,
          uid,
          name,
          type
        }
        emit('confirm', newFile)
        resolveCb && resolveCb(newFile)
        modalRef.value?.hide()
      }
    })
  }

  const cancel = () => rejectCb?.()

  defineExpose<ICropperModalInstance>({
    show
  })
</script>

<template>
  <Modal ref="modalRef" @ok="ok" @cancel="cancel">
    <Row :gutter="[16, 16]">
      <Col :span="13">
        <div class="image-container">
          <img ref="imageRef" />
        </div>
      </Col>
      <Col :span="11"> ffff </Col>
    </Row>
  </Modal>
</template>
