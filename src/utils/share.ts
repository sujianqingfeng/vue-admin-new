export const isDev = import.meta.env.DEV

export function getLocalStorage<T>(key: string, defaultVal: T): T {
  const value = localStorage.getItem(key)

  if (value) {
    return JSON.parse(value) as T
  }

  return defaultVal
}

export function setLocalStorage(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value))
}
