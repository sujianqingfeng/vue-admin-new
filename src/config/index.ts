import _config from './config'
import defaultConfig from './default'

// TODO 后续可能需要deepMerge
const config = {
  ...defaultConfig,
  ..._config
}

export default config
