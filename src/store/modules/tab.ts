import { unref } from 'vue'
import { Router } from 'vue-router'
import { getLocalStorage, setLocalStorage } from '@/utils/share'
import { defineStore } from 'pinia'

type TabItem = {
  title?: string
  closable?: boolean
  path: string
}

type TabState = {
  tabs: TabItem[]
}

const TAB_KEY = import.meta.env.VITE_TAB_KEY

export const useTabStore = defineStore('tab', {
  state: (): TabState => {
    return {
      tabs: getLocalStorage(TAB_KEY, [])
    }
  },
  getters: {
    caches(): string[] {
      return this.tabs.map((item) => item.title || '')
    }
  },
  actions: {
    matchTab(path: string) {
      return (item: TabItem) => item.path === path
    },
    saveTabs() {
      setLocalStorage(TAB_KEY, this.tabs)
    },
    addTab(tab: TabItem) {
      const { path } = tab

      const hasTab = this.tabs.find(this.matchTab(path))

      if (!hasTab) {
        this.tabs.push(tab)
        this.saveTabs()
      }
    },
    removeTab(tabPath: string, router: Router) {
      const index = this.tabs.findIndex(this.matchTab(tabPath))

      const remove = () => this.tabs.splice(index, 1)

      const { currentRoute } = router
      const { path } = unref(currentRoute)

      remove()
      this.saveTabs()

      if (path !== tabPath) {
        return
      }

      if (index > -1) {
        const toTargetTab = this.tabs[index - 1]

        router.push(toTargetTab.path)
      }
    }
  }
})
