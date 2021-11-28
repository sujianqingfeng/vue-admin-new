import deepMerge from 'deepmerge'
import customSetting from './setting'
import defaultSetting from './default'

const setting = deepMerge(defaultSetting, customSetting)

export default setting
