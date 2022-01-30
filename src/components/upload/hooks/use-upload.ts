import { useMessage } from '@/hooks/components'
import { uploadFile } from '@/utils/upload'
import { ref } from 'vue'

// 这里是复制出来的类型  antd 没有导出这个类型
export type UploadFileStatus = 'error' | 'success' | 'done' | 'uploading' | 'removed'
export interface UploadFile<T = any> {
  uid: string
  size: number
  name: string
  fileName?: string
  lastModified?: number
  lastModifiedDate?: Date
  url?: string
  status?: UploadFileStatus
  percent?: number
  thumbUrl?: string
  originFileObj?: any
  response?: T
  error?: any
  linkProps?: any
  type?: string
  xhr?: T
  preview?: string
}

type UploadChangeParam = {
  file: UploadFile
  fileList: UploadFile[]
}

export type IUploadProps = {
  maxSize: number
  modelValue?: any[] 
}
export type IUploadEmits = {
  (event: 'update:modelValue', successList: UploadFile[]): void
}

export const useUpload = (props: IUploadProps, emit: IUploadEmits) => {
  // const props = defineProps<UploadProps>()
  // withDefaults(props, { maxSize: 8 })

  const message = useMessage()
  const fileList = ref<UploadFile[]>([])

  const { maxSize } = props

  const customRequest = (options: any) => {
    // console.log('custom request options', options)
    const { onProgress, onError, onSuccess, file } = options

    uploadFile({
      file,
      config: {
        onUploadProgress: (progressEvent) => {
          const percent = ((progressEvent.loaded / progressEvent.total) * 100) | 0
          onProgress({ percent })
        }
      }
    })
      .then((res) => {
        file.url = res.url
        onSuccess(res, file)
      })
      .catch((err) => {
        onError(err)
      })
  }

  const beforeUpload = (file: UploadFile, list: UploadFile[]) => {
    const fileSize = file.size / 1024 / 1024
    if (fileSize > maxSize) {
      const msg = `图片不能超过${maxSize}M`
      message.error(msg)
      return Promise.reject(new Error(msg))
    }
    fileList.value = list
    return true
  }

  const handleChange = ({ file, fileList: files }: UploadChangeParam) => {
    fileList.value = files
    if (file.status !== 'uploading') {
      const successList = files.filter((file) => file.status === 'done')
      emit('update:modelValue', successList)
    }
  }

  return { beforeUpload, handleChange, fileList, customRequest }
}
