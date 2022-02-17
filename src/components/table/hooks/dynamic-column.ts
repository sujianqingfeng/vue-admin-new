import { VisibleColumn } from '..'
import { computed, reactive } from 'vue'

// type DataIndex = VisibleColumn['dataIndex']

import { DataIndex } from 'ant-design-vue/lib/vc-table/interface'
import { dataIndexEqual } from '../utils'

export const useDynamicColumn = (columns: VisibleColumn[], invisibleList: DataIndex[] = []) => {
  const isVisible = (column: VisibleColumn, invisibleList: DataIndex[] = []) => {
    if (!column.dataIndex) return true
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return !invisibleList.some((invisible) => dataIndexEqual(column.dataIndex, invisible))
  }

  const dynamicColumns = columns.map((column) => {
    column.visible = isVisible(column, invisibleList)
    return column
  })

  const originalColumns = reactive(dynamicColumns)

  const visibleColumns = computed(() => originalColumns.filter((column) => column.visible))

  const handleToggleVisible = (keys: DataIndex[]) => {
    for (let index = 0; index < originalColumns.length; index++) {
      const { dataIndex } = originalColumns[index]
      if (dataIndex) {
        originalColumns[index].visible = keys.some((key) => dataIndexEqual(key, dataIndex))
      }
    }
  }

  return { originalColumns, visibleColumns, handleToggleVisible }
}
