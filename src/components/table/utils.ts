import { DataIndex } from 'ant-design-vue/lib/vc-table/interface'

export const dataIndexEqual = (dataIndex: DataIndex, dataIndex2: DataIndex) => {
  if (typeof dataIndex !== typeof dataIndex2) return false

  if (typeof dataIndex === 'string' && dataIndex === dataIndex2) return true

  if (typeof dataIndex === 'number' && dataIndex === dataIndex2) return true

  if (Array.isArray(dataIndex) && Array.isArray(dataIndex2)) {
    if (dataIndex.length !== dataIndex2.length) {
      return false
    } else {
      for (let index = 0; index < dataIndex.length; index++) {
        if (dataIndex[index] !== dataIndex2[index]) {
          return false
        }
      }

      return true
    }
  }

  return false
}
