import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from './router'
import { setupStore } from './store'
import { setupPlugin } from './plugins'

import './styles/index.less'

const app = createApp(App)

setupStore(app)
setupRouter(app)
setupPlugin(app)

app.mount('#app')
