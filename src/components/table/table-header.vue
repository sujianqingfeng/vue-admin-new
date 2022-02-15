<script lang="ts" setup>
  import { withDefaults, ref, defineProps, defineEmits } from 'vue'
  import { Popover, Checkbox, CheckboxGroup, Tooltip } from 'ant-design-vue'
  import { SettingOutlined } from '@ant-design/icons-vue'
  import { propsToOne, propsToOptions } from '@/utils/share'

  import type { VisibleColumn } from './index'

  type IHeaderProps = {
    columns: VisibleColumn[]
    columnEnable?: boolean
  }

  const props = withDefaults(defineProps<IHeaderProps>(), {
    columns: () => []
  })

  const emit = defineEmits<{ (event: 'toggle', list: string[]): void }>()

  const options = props.columns.map(propsToOptions('title', 'dataIndex'))
  const defaultList = props.columns.filter((column) => column.visible).map(propsToOne('dataIndex'))
  const checkedList = ref(defaultList)

  const checkAll = ref(false)
  const indeterminate = ref(true)

  const emitChange = () => {
    emit('toggle', checkedList.value)
  }

  const handleCheckAllChange = (e: any) => {
    const checked = e.target.checked
    checkedList.value = checked ? options.map(propsToOne('value')) : []
    indeterminate.value = false
    checkAll.value = checked
    emitChange()
  }

  const handleCheckChange = () => {
    emitChange()
  }
</script>

<template>
  {{ options }}
  <div class="table-header flex justify-between items-center">
    <div class="left-action">left</div>
    <div class="right-action">
      <Popover placement="bottomRight" trigger="click">
        <template #title>
          <Checkbox :indeterminate="indeterminate" :checked="checkAll" @change="handleCheckAllChange">全选</Checkbox>
        </template>

        <template #content>
          <CheckboxGroup v-model="checkedList" @change="handleCheckChange">
            <section v-for="option in options" :key="option.label">
              <Checkbox :value="option.value">{{ option.label }}</Checkbox>
            </section>
          </CheckboxGroup>
        </template>

        <Tooltip title="列配置">
          <SettingOutlined />
        </Tooltip>
      </Popover>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .table-header {
    .right-action {
    }
  }
</style>
