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
