import { defineStore } from 'pinia'
import { unref } from 'vue'
import { Router } from 'vue-router'

type TabItem = {
  title?: string
  closable?: boolean
  path: string
}

type TabState = {
  tabs: TabItem[]
}

export const useTabStore = defineStore('tab', {
  state: (): TabState => {
    return {
      tabs: []
    }
  },
  actions: {
    matchTab(path: string) {
      return (item: TabItem) => item.path === path
    },
    addTab(tab: TabItem) {
      const { path } = tab

      const hasTab = this.tabs.find(this.matchTab(path))

      if (!hasTab) {
        this.tabs.push(tab)
      }
    },
    removeTab(tabPath: string, router: Router) {
      const index = this.tabs.findIndex(this.matchTab(tabPath))

      const remove = () => this.tabs.splice(index, 1)

      const { currentRoute } = router
      const { path } = unref(currentRoute)

      remove()

      if (path !== tabPath) {
        return
      }

      if (index > -1) {
        let toTargetTab = this.tabs[index - 1]

        router.push(toTargetTab.path)
      }
    }
  }
})
