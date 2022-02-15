import { VisibleColumn } from '..'
import { computed, reactive } from 'vue'
import { propsAddNewAttrs } from '@/utils/share'

// type DataIndex = VisibleColumn['dataIndex']

import { DataIndex } from 'ant-design-vue/lib/vc-table/interface'

export const useDynamicColumn = (columns: VisibleColumn[], invisible: DataIndex[] = []) => {
  const isVisible = (column: VisibleColumn) => {
    return !invisible.includes(column.dataIndex ?? '')
  }

  // const dynamicColumns = columns.map(propsAddNewAttrs<VisibleColumn>((column) => ({ visible: isVisible(column) })))
  const dynamicColumns = columns.map((column) => {
    column.visible = isVisible(column)
    return column
  })

  const originalColumns = reactive(dynamicColumns)

  const visibleColumns = computed(() => originalColumns.filter((column) => column.visible))

  const handleToggleVisible = (keys: DataIndex[]) => {
    console.log(1111, keys)

    for (let index = 0; index < originalColumns.length; index++) {
      const { dataIndex } = originalColumns[index]
      if (dataIndex) {
        originalColumns[index].visible = keys.includes(dataIndex)
      }
    }
  }

  return { originalColumns, visibleColumns, handleToggleVisible }
}
