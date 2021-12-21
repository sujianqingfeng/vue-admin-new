import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

export function useMenuKeys() {
  const route = useRoute()

  const selectedKeys = ref<string[]>([])
  const openKeys = ref<string[]>([])

  watchEffect(() => {
    const { matched, path } = route
    const length = matched.length

    selectedKeys.value = [path]

    for (let index = length - 1; index > 0; index--) {
      const item = matched[index]
      if (path !== item.path) {
        openKeys.value = [item.path]
        break
      }
    }
  })

  return {
    selectedKeys,
    openKeys
  }
}
