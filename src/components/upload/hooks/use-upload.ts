import { useMessage } from '@/hooks/components'
import { ref, defineProps } from 'vue'

type UploadProps = {
  maxSize?: number
}

export const useProps = () => {
  const props = defineProps<UploadProps>()

  return {
    props
  }
}

export const useUpload = (props: UploadProps) => {
  const { maxSize = 8 } = props
  const message = useMessage()
  const fileList = ref<any>([])

  const beforeUpload = (file: any, list: any[]) => {
    const fileSize = file.size / 1024 / 1024
    if (fileSize > maxSize) {
      const msg = `图片不能超过${maxSize}M`
      message.error(msg)
      return Promise.reject(new Error(msg))
    }
    fileList.value = list
    return true
  }

  return { beforeUpload }
}
