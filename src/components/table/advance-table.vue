<script lang="ts" setup>
  import { useAttrs, useSlots, withDefaults, defineProps } from 'vue'
  import { Table } from 'ant-design-vue'
  import { useDynamicColumn } from './hooks/dynamic-column'
  import TableHeader from './table-header.vue'

  import type { GetRowKey } from 'ant-design-vue/es/table/interface'
  import { DataIndex } from 'ant-design-vue/lib/vc-table/interface'
  import type { VisibleColumn } from './index'

  type ITableProps = {
    columns: VisibleColumn[]
    invisible?: DataIndex[]
    rowKey?: string | GetRowKey<any>
    columnEnable?: boolean
  }

  const props = withDefaults(defineProps<ITableProps>(), {
    rowKey: 'id',
    invisible: () => [],
    columns: () => []
  })

  const slots = useSlots()
  const headerSlots = ['left', 'right']
  const tableSlots = Object.keys(slots).filter((slotName) => !headerSlots.includes(slotName))

  const attrs = useAttrs()

  const { visibleColumns, handleToggleVisible, originalColumns } = useDynamicColumn(props.columns, props.invisible)
</script>

<template>
  <div class="advance-table">
    <TableHeader :columns="originalColumns" :column-enable="columnEnable" @toggle="handleToggleVisible">
      <template v-for="slotName in headerSlots" #[slotName]>
        <slot :name="slotName" />
      </template>
    </TableHeader>

    <Table v-bind="attrs" :columns="visibleColumns" :row-key="rowKey">
      <template v-for="slotName in tableSlots" #[slotName]="params">
        <slot :name="slotName" v-bind="params" />
      </template>
    </Table>
  </div>
</template>
