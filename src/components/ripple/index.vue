<script lang="ts" setup></script>

<template>
  <div class="ripple">
    <slot />
  </div>
</template>

<style lang="less" scoped>
  .ripple {
    cursor: pointer;

    &:hover {
      background-color: @primary-1;
    }
  }
</style>
