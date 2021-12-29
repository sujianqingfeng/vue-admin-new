import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from './router'
import { setupStore } from './store'
import { setupPlugin } from './plugins'

import './styles/index.less'
import { isDev } from './utils/share'
import { setupMockServer } from './mock-server'

const app = createApp(App)

setupStore(app)
setupRouter(app)
setupPlugin(app)

if (isDev) {
  setupMockServer()
}

app.mount('#app')
