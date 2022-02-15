import AdvanceTable from './advance-table.vue'

import type { ColumnType } from 'ant-design-vue/es/table/interface'
type VisibleColumn = ColumnType & { visible?: boolean }

export { AdvanceTable, VisibleColumn }
