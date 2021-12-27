<script lang="ts" setup>
  import { ref } from 'vue'

  const rippleWrapperRef = ref<HTMLElement | null>(null)

  const rippleShow = ref(false)
  const rippleStyle = ref({})

  function onRippleWrapper(e: MouseEvent) {
    console.log(e, rippleWrapperRef.value)

    const currentTarget = rippleWrapperRef.value

    if (!currentTarget) return
    rippleShow.value = true

    const d = Math.max(currentTarget.clientHeight, currentTarget.clientWidth)
    rippleStyle.value = {
      width: d + 'px',
      height: d + 'px',
      left: e.clientX - currentTarget?.offsetLeft - d / 2 + 'px',
      top: e.clientY - currentTarget?.offsetTop - d / 2 + 'px'
    }
  }
</script>

<template>
  <div ref="rippleWrapperRef" class="ripple-wrapper" @click="onRippleWrapper">
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
