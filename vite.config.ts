import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import eslint from 'vite-plugin-eslint'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

import { generateModifyVars } from './build/theme/config'

const resolve = (dir: string) => path.resolve(__dirname, dir)

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve('src')
    }
  },
  plugins: [
    vue(),
    eslint(),
    Components({
      dts: true,
      resolvers: [
        AntDesignVueResolver({
          importStyle: 'less'
        })
      ]
    })
  ],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: generateModifyVars(),
        javascriptEnabled: true
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:4523/mock/479984',
        changeOrigin: true,
        rewrite: (path) => {
          return path.replace(/^\/api/, '')
        }
      }
    }
  }
})
