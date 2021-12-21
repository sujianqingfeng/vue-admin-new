import { RouteRecordRaw, useRoute } from 'vue-router'
import { ref, watchEffect } from 'vue'

type Breadcrumb = {
  path: string
  title: string
  icon?: string
  children?: Breadcrumb[]
}

function parseToBreadcrumb(raws: RouteRecordRaw[]) {
  const results: Breadcrumb[] = []

  raws.forEach((raw) => {
    const { name, path, children, meta } = raw

    // const index = results.findIndex((item) => item.path === path)
    // // 存在移除
    // if (index > -1) {
    //   results.splice(index, 1)
    // }

    const result: Breadcrumb = {
      path,
      title: meta?.title || (name as string)
    }

    const isVisible = children?.every((item) => !item.meta?.invisible)

    if (children && isVisible) {
      result.children = parseToBreadcrumb(children.filter((item) => !item.meta?.invisible))
    }

    if (!meta?.invisible) {
      results.push(result)
    }
  })

  return results
}

export function useBreadcrumb() {
  const route = useRoute()

  const breadcrumbs = ref<Breadcrumb[]>([])

  watchEffect(() => {
    const matched = route.matched.filter((item) => item.path !== '/')

    breadcrumbs.value = parseToBreadcrumb(matched)
  })

  return { breadcrumbs }
}
