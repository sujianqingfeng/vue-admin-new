import { defineConfig } from 'vite-plugin-windicss'

export default defineConfig({
  darkMode: 'class',
  attributify: {
    prefix: 'w:'
  },
  shortcuts: {
    'flex-center': 'flex item-center justify-center'
  },
  extract: {
    include: ['src/**/*.{vue,html,jsx,tsx}'],
    exclude: ['node_modules', '.git']
  }
})
