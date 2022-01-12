<script lang="ts" setup>
  import { storeToRefs } from 'pinia'
  import { useAccountStore } from '@/store/modules/account'

  const accountStore = useAccountStore()
  const { user } = storeToRefs(accountStore)
</script>

<template>
  <div class="flex-center p-8">
    <a-avatar :size="64" :src="user?.avatar"></a-avatar>
  </div>
</template>
