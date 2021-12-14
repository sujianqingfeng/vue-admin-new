import deepMerge from 'deepmerge'
import customSetting from './setting'
import defaultSetting from './default'

export * from './icon-map'

export const setting = deepMerge(defaultSetting, customSetting)
