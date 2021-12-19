import { ref } from 'vue'
import { useRoute } from 'vue-router'

export function useMenuKeys() {
  const route = useRoute()

  const selectedKeys = ref([route.path])
  const openKeys = ref<string[]>([])

  const { matched, path } = route
  const length = matched.length

  for (let index = length - 1; index > 0; index--) {
    const item = matched[index]
    if (path !== item.path) {
      openKeys.value.push(item.path)
      break
    }
  }

  return {
    selectedKeys,
    openKeys
  }
}
