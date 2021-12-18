import { getCurrentInstance } from 'vue'
import { warn, error, info } from '@/utils/log'

export function useLog(defaultName?: string) {
  const instance = getCurrentInstance()

  let name = ''

  if (defaultName) {
    name = defaultName
  } else if (instance?.type.name) {
    name = instance.type.name
  } else if (instance?.type.__file) {
    const fullPath = instance?.type.__file
    const filename = fullPath.replace(/^.*[\\/]/, '')
    name = filename
  } else {
    name = 'unknown vue name'
  }

  name = `${name}: `

  return {
    warn: warn.bind(null, name),
    error: error.bind(null, name),
    info: info.bind(null, name)
  }
}
