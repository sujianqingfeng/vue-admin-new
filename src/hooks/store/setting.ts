import { computed, unref } from 'vue'
import { useSettingStore } from '@/store/modules/setting'

export function useSetting() {
  const settingStore = useSettingStore()

  const asyncRouter = computed(() => settingStore.asyncRouter)

  const collapsed = computed(() => settingStore.collapsed)
  const themeMode = computed(() => settingStore.themeMode)

  const menuWidth = computed(() => settingStore.menuWidth)
  const menuCollapseWidth = computed(() => settingStore.menuCollapseWidth)

  const realMenuWidth = computed(() => (unref(collapsed) ? menuCollapseWidth.value : menuWidth.value))

  function toggleCollapsed() {
    settingStore.setCollapsed(!unref(collapsed))
  }

  return { collapsed, toggleCollapsed, themeMode, asyncRouter, realMenuWidth, menuWidth, menuCollapseWidth }
}
