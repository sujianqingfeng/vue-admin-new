import { UserConfigExport, ConfigEnv } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import eslint from 'vite-plugin-eslint'
import Components from 'unplugin-vue-components/vite'
import { createStyleImportPlugin, AndDesignVueResolve } from 'vite-plugin-style-import'
import { visualizer } from 'rollup-plugin-visualizer'

import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from 'vite-plugin-mock'
import WindiCSS from 'vite-plugin-windicss'

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

      createStyleImportPlugin({
        resolves: [AndDesignVueResolve()]
      }),

      WindiCSS(),

      viteMockServe({
        mockPath: 'mock',
        logger: true,
        localEnabled: command === 'serve',
        prodEnabled: command !== 'serve' && prodMock,
        injectCode: `
          import { setupProdMockServer } from './mock/mock-prod-server';
          setupProdMockServer ();
        `
      }),
      visualizer()
    ],
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: generateModifyVars(),
          javascriptEnabled: true
        }
      }
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            cropperjs: ['cropperjs'],
            'ant-design-vue': ['ant-design-vue'],
            '@wangeditor+editor': ['@wangeditor/editor']
          }
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
