import { defineStore } from 'pinia'
import { setting } from '@/settings'
import type { Setting } from '@/types/store'

export type SettingState = Setting

export const useSettingStore = defineStore('setting', {
  state: (): SettingState => {
    return {
      ...setting
    }
  },
  getters: {
    realMenuWidth(state) {
      return state.collapsed ? state.menuCollapseWidth : state.menuWidth
    }
  },

  actions: {
    setCollapsed(collapsed: boolean) {
      this.collapsed = collapsed
    },
    toggleCollapsed() {
      this.collapsed = !this.collapsed
    }
  }
})
