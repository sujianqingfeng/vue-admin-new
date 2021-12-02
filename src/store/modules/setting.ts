import setting from '@/settings'
import { Setting } from '@/types/setting'
import { defineStore } from 'pinia'

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
