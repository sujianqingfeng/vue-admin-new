import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import basicRoutes from './basic'
import { useGuards } from './hooks/guard'

export const router = createRouter({
  history: createWebHistory(),
  routes: basicRoutes
})

const { loadGuards } = useGuards(router)

export function setupRouter(app: App) {
  app.use(router)

  loadGuards()
}
