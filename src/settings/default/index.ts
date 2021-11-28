type Theme = {
  mode: 'light' | 'dark' | 'night'
}

export type Setting = {
  asyncRouter: boolean
  theme: Theme
}

export default {
  asyncRouter: false,
  theme: {
    mode: 'light'
  }
} as Setting
