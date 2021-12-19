<script lang="ts" setup>
  import { useSetting } from '@/hooks'
  import { computed, CSSProperties, unref } from 'vue'

  const { realMenuWidth } = useSetting()

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
