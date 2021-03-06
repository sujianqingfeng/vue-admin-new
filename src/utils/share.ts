export const isDev = import.meta.env.DEV

export const hasKey = (target: any, key: string) => Object.prototype.hasOwnProperty.call(target, key)

export function deepMerge<T extends object>(target: Partial<T>, source: Partial<T>) {
  // 处理数组
  const targetIsArray = Array.isArray(target)
  const sourceIsArray = Array.isArray(source)

  if (targetIsArray && sourceIsArray) {
    return Array.from(new Set(target.concat(source)))
  }

  // 处理对象
  const result = {} as Record<keyof T, any>

  for (const key in target) {
    const targetVal = target[key]
    const sourceVal = source[key]

    if (sourceVal && targetVal) {
      if (typeof targetVal === 'object' && typeof sourceVal === 'object') {
        result[key] = deepMerge(targetVal as unknown as object, sourceVal as unknown as object)
      } else {
        result[key] = sourceVal
      }
    } else {
      result[key] = sourceVal || targetVal
    }
  }

  for (const key in source) {
    if (!hasKey(result, key)) {
      result[key] = source[key]
    }
  }

  return result
}

export const generateUUID = () =>
  `${1e7 + -1e3 + -4e3 + -8e3 + -1e11}`.replace(/[018]/g, (c: string) => (-c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (-c / 4)))).toString(16))

/**
 * 给数组中的对象添加属性
 *
 * @param attrs
 * @returns
 */
export function propsAddNewAttrs<T = object>(attrs: ((props: T) => object) | object) {
  if (typeof attrs === 'function') {
    return (props: T) => ({ ...props, ...attrs(props) })
  }

  return (props: T) => ({ ...props, ...attrs })
}

/**
 * 获取options
 *
 * @param label
 * @param value
 * @returns
 */
export const propsToOptions = (label: string, value: string) => (props: Record<string, any>) => ({
  label: props[label],
  value: props[value] || ''
})

/**
 * 获取一个值
 *
 * @param {*} key
 * @returns
 */
export const propsToOne = (key: string) => (props: Record<string, any>) => props[key]
