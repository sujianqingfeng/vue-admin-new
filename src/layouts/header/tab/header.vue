<script lang="ts" setup>
  import { useLog } from '@/hooks/utils/log'
  import { useTabStore } from '@/store/modules/tab'
  import { computed, ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  const router = useRouter()

  const tabStore = useTabStore()
  const route = useRoute()

  const { info } = useLog()

  const activeTab = ref(route.path)
  watch(
    () => route.path,
    (path, old) => {
      info(`path change | ${old} -> ${path}`)
      const {
        name,
        meta: { title, canNotRemoveTab = false }
      } = route

      activeTab.value = path
      tabStore.addTab({ title: title || (name as string), path, closable: !canNotRemoveTab })
    },
    { immediate: true }
  )

  const tabs = computed(() => tabStore.tabs)

  const handleEdit = (tabPath: string, action: string) => {
    if (action === 'remove') {
      tabStore.removeTab(tabPath, router)
    }
  }

  const handleChange = (tabPath: string) => {
    activeTab.value = tabPath
    router.push(tabPath)
  }
</script>

<template>
  <div>
    <a-tabs :active-key="activeTab" type="editable-card" hide-add :tab-bar-gutter="3" @edit="handleEdit" @change="handleChange">
      <a-tab-pane v-for="tab in tabs" :key="tab.path" :tab="tab.title" :closable="tab.closable"> </a-tab-pane>
    </a-tabs>
  </div>
</template>
