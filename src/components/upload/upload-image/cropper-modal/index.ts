import CropperModal from './cropper-modal.vue'

import { FileType, UploadFile } from 'ant-design-vue/lib/upload/interface'
import Cropper from 'cropperjs'

type IShowConfig = {
  file: UploadFile
  options?: Cropper.Options
}

type ICropperModalInstance = {
  show(config: IShowConfig): Promise<FileType>
}

export { CropperModal, IShowConfig, ICropperModalInstance }
