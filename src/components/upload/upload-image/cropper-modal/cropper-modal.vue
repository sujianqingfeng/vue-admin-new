<script lang="ts" setup>
  import { nextTick, ref, defineProps, defineEmits, defineExpose, withDefaults, watch, onUnmounted } from 'vue'
  import { Row, Col, RadioGroup, Radio } from 'ant-design-vue'
  import type { UploadFile, FileType } from 'ant-design-vue/lib/upload/interface'
  import { Modal, IModalInstance } from '../../../modal'
  import Cropper from 'cropperjs'
  import 'cropperjs/dist/cropper.min.css'
  import { IShowConfig, ICropperModalInstance } from '.'

  const props = withDefaults(defineProps<{ aspectRatio?: number }>(), { aspectRatio: 1 })
  const emit = defineEmits<{ (event: 'confirm', file: UploadFile): void }>()

  const modalRef = ref<IModalInstance>()
  const imageRef = ref()
  const previewRef = ref()
  let cropperInstance: Cropper | null = null
  const _aspectRatio = ref(props.aspectRatio)
  let tempFile: UploadFile | null = null
  let resolveCb: ((value: FileType) => void) | null = null
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
    console.log('show', file, options)

    return new Promise<FileType>((resolve, reject) => {
      resolveCb = resolve
      rejectCb = reject
      modalRef.value?.show()
      nextTick(() => {
        if (!cropperInstance) {
          const mergeOptions: Cropper.Options = { ...defaultOptions, ...options, preview: previewRef.value }
          cropperInstance = new Cropper(imageRef.value, mergeOptions)
        }

        if (options?.aspectRatio) {
          _aspectRatio.value = options?.aspectRatio
        }

        tempFile = file
        fileToDataUri(file as unknown as File).then((dataUri) => {
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
        const newFile = new File([blob], name, { type }) as FileType
        newFile.uid = uid

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

      <Col :span="11">
        <p>预览</p>
        <div ref="previewRef" class="overflow-hidden w-[150px] h-[150px] border border-[#ebebeb] border-solid"></div>
        <div class="actions-container mt-4">
          <div class="radio mt-2">
            <span>比例：</span>
            <RadioGroup v-model:value="_aspectRatio">
              <Radio :value="1">1:1</Radio>
              <Radio :value="2">2:1</Radio>
              <Radio :value="3 / 2">3:2</Radio>
            </RadioGroup>
          </div>
        </div>
      </Col>
    </Row>
  </Modal>
</template>
