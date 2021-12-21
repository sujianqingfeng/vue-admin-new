<template>
  <div class="ripple">
    <slot />
  </div>
</template>

<style lang="less" scoped>
  .ripple {
    background-position: center;
    transition: background 0.8s;
  }
  .ripple:hover {
    background: #e6f7ff radial-gradient(circle, transparent 1%, #e6f7ff 1%) center/15000%;
    cursor: pointer;
  }
  .ripple:active {
    background-color: #e6f7ff;
    background-size: 100%;
    transition: background 0s;
  }
</style>
