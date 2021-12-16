import { computed, unref } from 'vue'
import { useSettingStore } from '@/store/modules/setting'

export function useSetting() {
  const settingStore = useSettingStore()

  const collapsed = computed(() => settingStore.collapsed)
  const themeMode = computed(() => settingStore.themeMode)
  const menuWidth = computed(() => (unref(settingStore.collapsed) ? settingStore.menuCollapseWidth : settingStore.menuWidth))

  const asyncRouter = settingStore.asyncRouter

  function toggleCollapsed() {
    settingStore.setCollapsed(!unref(collapsed))
  }

  return { collapsed, toggleCollapsed, themeMode, asyncRouter, menuWidth }
}
