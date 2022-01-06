import 'vue-router'

declare module 'vue-router' {
  // eslint-disable-next-line no-unused-vars
  interface RouteMeta {
    icon?: string
    invisible?: boolean
    title?: string
    canNotRemoveTab?: boolean
  }
}
