<script lang="ts" setup>
  import { ref } from 'vue'
  import { Button as AButton } from 'ant-design-vue'

  import { Modal } from '@/components/modal'

  const modalRef = ref()

  const handleBasicModal = () => {
    modalRef.value.show()
  }
</script>

<template>
  <a-button type="primary" @click="handleBasicModal">基础模态框</a-button>
  <modal ref="modalRef"> ffff </modal>
</template>
