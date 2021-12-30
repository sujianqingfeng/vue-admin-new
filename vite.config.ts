import { UserConfigExport, ConfigEnv } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import eslint from 'vite-plugin-eslint'
import Components from 'unplugin-vue-components/vite'
import styleImport, { AndDesignVueResolve } from 'vite-plugin-style-import'

import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from 'vite-plugin-mock'

import { generateModifyVars } from './build/theme/config'

const resolve = (dir: string) => path.resolve(__dirname, dir)

export default ({ command }: ConfigEnv): UserConfigExport => {
  const prodMock = false

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
      styleImport({
        resolves: [AndDesignVueResolve()],
        // 自定义规则
        libs: [
          {
            libraryName: 'ant-design-vue',
            esModule: true,
            resolveStyle: (name) => {
              return `ant-design-vue/es/${name}/style/index`
            }
          }
        ]
      }),

      viteMockServe({
        mockPath: 'mock',
        logger: true,
        localEnabled: command === 'serve',
        prodEnabled: command !== 'serve' && prodMock,
        injectCode: `
          import { setupProdMockServer } from './mock/mock-prod-server';
          setupProdMockServer ();
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
    }
    // server: {
    //   proxy: {
    //     '/api': {
    //       target: 'http://127.0.0.1:3000/mock',
    //       changeOrigin: true,
    //       rewrite: (path) => {
    //         return path.replace(/^\/api/, '')
    //       }
    //     }
    //   }
    // }
  }
}
