<script lang="ts" setup>
  import { ref, defineExpose, defineProps, withDefaults, defineEmits, useAttrs } from 'vue'
  import { Modal } from 'ant-design-vue'
  import type { IModalInstance } from '.'

  const attrs = useAttrs()
  const visible = ref(false)
  const confirmLoading = ref(false)

  const props = withDefaults(defineProps<{ autoCancel?: boolean }>(), { autoCancel: true })
  const emit = defineEmits<{ (event: 'ok'): void; (event: 'cancel'): void }>()

  const showLoading = () => (confirmLoading.value = true)
  const hideLoading = () => (confirmLoading.value = false)

  const toggle = (status: boolean) => (visible.value = status)
  const show = () => toggle(true)
  const hide = () => {
    hideLoading()
    toggle(false)
  }

  const cancel = () => (props.autoCancel ? hide() : emit('cancel'))
  const ok = () => emit('ok')

  defineExpose<IModalInstance>({
    show,
    hide,
    showLoading
  })
</script>

<template>
  <modal v-bind="attrs" v-model:visible="visible" :confirm-loading="confirmLoading" @cancel="cancel" @ok="ok">
    <slot />
  </modal>
</template>
