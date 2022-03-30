import { useMessage } from '@/hooks/components'
import { generateUUID } from '@/utils/share'
import { uploadFile } from '@/utils/upload'
import { ref, watch } from 'vue'
// 这个等ui组件正式发布，就可以从ant-design-vue中取出来了
import type { FileType } from 'ant-design-vue/lib/upload/interface'
import type { UploadChangeParam, UploadFile } from 'ant-design-vue'

export { UploadFile, FileType }

export type IUploadProps = {
  maxSize: number
  modelValue?: any
}
export type IUploadEmits = {
  (event: 'update:modelValue', successList: UploadFile[]): void
}

export const useUpload = (props: IUploadProps, emit: IUploadEmits) => {
  const getDefaultList = (val: any) => {
    // const isUploadComponent = (uid: string) => uid.match('/vc-upload/')

    // 这里根据后端返回的不同情况来处理  有些返回是字符串 有些是返回的是对象

    // 如果是string 当作文件的url来处理
    if (typeof val === 'string') {
      const uid = generateUUID()
      return [{ url: val, uid, name: uid, status: 'done' }] as UploadFile[]
    }

    if (typeof val === 'object') {
      if (Array.isArray(val)) {
        return val.map((item) => {
          // 通过判断uid 来判断已经处理过的数据
          if (item.uid) {
            return item as UploadFile
          }

          // else other 这里要针对不同内容来处理
          // .... 这里直接写死
          return item as UploadFile
        })
      }
    }

    return []
  }

  const message = useMessage()
  const { maxSize, modelValue } = props
  const fileList = ref<UploadFile[]>(getDefaultList(modelValue))

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

  const beforeUpload = (file: FileType, list: FileType[]) => {
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

  watch(
    () => props.modelValue,
    (val: any) => {
      fileList.value = getDefaultList(val)
    }
  )

  return { beforeUpload, handleChange, fileList, customRequest }
}
