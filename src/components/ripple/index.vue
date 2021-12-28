<script lang="ts" setup>
  import { useEventListener } from '@/hooks/web'
  import { ref } from 'vue'

  const rippleWrapperRef = ref<HTMLElement | null>(null)

  const rippleShow = ref(false)
  const rippleStyle = ref({})

  useEventListener(rippleWrapperRef, 'click', (e: Event) => {
    if (rippleWrapperRef.value) {
      const style = createRippleStyle(rippleWrapperRef.value as HTMLElement, e as MouseEvent)
      console.log(style)
    }
  })

  function createRippleStyle(el: HTMLElement, e: MouseEvent) {
    const { clientHeight, clientWidth, offsetLeft, offsetTop } = el

    const size = Math.max(clientHeight, clientWidth)

    const { clientX, clientY } = e

    const left = clientX - offsetLeft - size / 2 + 'px'
    const top = clientY - offsetTop - size / 2 + 'px'

    const sizeUnit = size + 'px'

    return { width: sizeUnit, height: sizeUnit, left, top }
  }
</script>

<template>
  <div ref="rippleWrapperRef" class="ripple-wrapper">
    <div v-if="rippleShow" class="ripple" :style="rippleStyle"></div>
    <slot />
  </div>
</template>

<style lang="less" scoped>
  @keyframes ripple {
    to {
      transform: scale(2.5);
      opacity: 0;
    }
  }

  .ripple-wrapper {
    position: relative;
    overflow: hidden;
    cursor: pointer;

    .ripple {
      border-radius: 50%;
      background-color: @border-color-base;
      position: absolute;
      transform: scale(0);
      animation: ripple 0.6s linear;
    }

    &:hover {
      background-color: @border-color-base;
    }
  }
</style>
