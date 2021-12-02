import { computed, unref } from 'vue'
import { useSettingStore } from '@/store/modules/setting'

export function useSetting() {
  const settingStore = useSettingStore()

  const getCollapsed = computed(() => settingStore.collapsed)

  const getThemeMode = computed(() => settingStore.themeMode)

  function toggleCollapsed() {
    settingStore.setCollapsed(!unref(getCollapsed))
  }

  return { getCollapsed, toggleCollapsed, getThemeMode }
}
