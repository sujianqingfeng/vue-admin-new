<script lang="ts" setup>
  import { usePermissionFn } from '@/hooks/permission'

  const onClick = usePermissionFn(
    (e: Event, index: number) => {
      console.log('click', e, index)
    },
    { key: 'menu' }
  )
</script>

<template>
  permission

  <p @click="onClick($event, 1)">点击事件</p>

  <p v-permission:menu>测试指令 menu</p>
  <p v-permission:men>测试指令 men</p>
  <p v-permission:menu="'delete'">测试指令 menu delete</p>
  <p v-permission:menu="'other,delete'">测试指令 menu other,delete</p>
  <p v-permission:menu="['delete']">测试指令 menu ['delete']</p>
  <p v-permission:menu="['delete', 'edit']">测试指令 menu [ delete edit]</p>
  <p v-permission:menu="['delete', 'edit', 'ffff']">测试指令 menu [delete edit ffff]</p>
</template>
