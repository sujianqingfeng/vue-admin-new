import setting from '@/settings'
import { Setting } from '@/settings/default'
import { defineStore } from 'pinia'

export type SettingState = {} & Setting

export const useSettingStore = defineStore('setting', {
  state: (): SettingState => {
    return {
      ...setting
    }
  }
})
