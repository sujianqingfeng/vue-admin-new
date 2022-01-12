<script lang="ts" setup>
  import { storeToRefs } from 'pinia'
  import { computed, CSSProperties, unref } from 'vue'
  import { useSettingStore } from '@/store/modules/setting'

  const { realMenuWidth } = storeToRefs(useSettingStore())

  const style = computed((): CSSProperties => {
    const width = unref(realMenuWidth) + 'px'

    return {
      width,
      flex: '0 0 ' + width,
      maxWidth: width,
      minWidth: width,
      transition: 'all ease .3s'
    }
  })
</script>

<template>
  <div :style="style"></div>
</template>
