export enum DataStoreType {
  STRING,
  JSON,
  NUMBER
}

export class DataStore {
  static get(key: string, type: DataStoreType = DataStoreType.STRING) {
    const value = localStorage.getItem(key)
    if (value) {
      switch (type) {
        case DataStoreType.JSON:
          return JSON.parse(value)

        case DataStoreType.NUMBER:
          return Number(value)

        default:
          return value
      }
    }
  }

  static set(key: string, value: any, type: DataStoreType = DataStoreType.STRING) {
    if (type === DataStoreType.JSON) {
      localStorage.setItem(key, JSON.stringify(value))
      return
    }

    localStorage.setItem(key, value)
  }
}
