import { defineStore } from 'pinia'
import { setting } from '@/settings'
import type { Setting } from '@/types/setting'

export type SettingState = {} & Setting

export const useSettingStore = defineStore('setting', {
  state: (): SettingState => {
    return {
      ...setting
    }
  },
  actions: {
    setCollapsed(collapsed: boolean) {
      this.collapsed = collapsed
    }
  }
})
