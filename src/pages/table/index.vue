<script lang="ts" setup>
  import { AdvanceTable } from '@/components/table'
  import { dataSource, columns } from './data'
</script>

<template>
  <AdvanceTable :columns="columns" :data-source="dataSource">
    <div>default slot</div>

    <template #action>
      <div>action slot</div>
    </template>
  </AdvanceTable>
</template>
