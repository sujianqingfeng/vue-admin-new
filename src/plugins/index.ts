import { App } from 'vue'
import { PermissionPlugin } from './permission'

export function setupPlugin(app: App) {
  app.use(PermissionPlugin)
}
