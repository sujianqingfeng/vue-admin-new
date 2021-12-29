import { UserConfigExport, ConfigEnv, loadEnv } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import eslint from 'vite-plugin-eslint'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from 'vite-plugin-mock'

import { generateModifyVars } from './build/theme/config'

const resolve = (dir: string) => path.resolve(__dirname, dir)

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const prodMock = false

  const root = process.cwd()
  const env = loadEnv(mode, root)

  console.log(env)

  return {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    plugins: [
      vue(),
      // cache 最好关闭 踩了坑
      eslint({ cache: false }),
      Components({
        dts: true,
        resolvers: [
          AntDesignVueResolver({
            importStyle: 'less'
          })
        ]
      }),
      viteMockServe({
        mockPath: 'api',
        localEnabled: command === 'serve',
        prodEnabled: command !== 'serve' && prodMock,
        //  这样可以控制关闭mock的时候不让mock打包到最终代码内
        injectCode: `
          import { setupMockServer } from './mock-server';
          setupMockServer();
        `
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
  }
}
