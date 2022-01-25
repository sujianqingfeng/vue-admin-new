# Vue3 网络封装

最近在写 Vue3 的 composition api 写法,积累了一个封装请求的方法。

## 参数分析

```
type IFetchOption = {
  apiFn: (params: any) => Promise<any>
  auto?: boolean
  params?: any
  format?: (res: any) => any
  onSuccess?: (data: any) => void
  defaultValue?: any
}
```

- apiFn 一个请求方法，返回的是一个 promise，因为一般请求的工具类返回的就是一个 promise，比如 axios
- auto 是否一开始就请求
- params 请求参数
- format 格式化返回数据，有时候需要处理
- onSuccess 请求成功之后的回调，按照道理来说应该有 onFail，但是我一直没有用到
- defaultValue 一开始的默认值

## 返回参数分析

- loading 请求状态
- fetchApi 请求方法
- result 请求结果

## 基础请求

```
export const useFetch = ({ apiFn, params, auto = true, format, onSuccess, defaultValue = {} }: IFetchOption) => {
  const loading = ref(false)
  const result = ref(defaultValue)

  const fetchApi = async (params: any) => {
    loading.value = true

    try {
      const res = await apiFn(params)
      result.value = format ? format(res) : res
      loading.value = false
      const data = unref(result)
      onSuccess?.(data)
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  if (auto) {
    fetchApi(params)
  }

  return { fetchApi, loading, result }
}
```

## 请求列表

```
export const useFetchList = (option: IFetchOption) => {
  const { fetchApi: fetchList, loading, result: list } = useFetch({ ...option, defaultValue: [] })
  return { fetchList, loading, list }
}

```

### 请求分页列表

> 已 ANDT-Vue 的分页为例

```
export const useFetchPageList = (option: IFetchOption) => {
  const paginationChange = (cur: number, size: number) => {
    pagination.current = cur
    pagination.pageSize = size
    fetchPageList(params)
  }

  const pagination = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
    pageSizeOptions: ['10', '20', '50', '100'],
    showSizeChanger: true,
    showLessItems: true,
    showQuickJumper: true,
    showTotal: (total: number, range: number[]) => `第 ${range[0]}-${range[1]} 条，总计 ${total} 条`,
    onShowSizeChange: paginationChange,
    onChange: paginationChange
  })

  const { auto = true, params, format, onSuccess } = option

  const { fetchList, list, loading } = useFetchList({
    ...option,
    auto: false,
    format: (res: any) => {
      return format ? format(res.records) : res.records
    },
    onSuccess: (data: any) => {
      pagination.total = data.total
      onSuccess?.(data)
    }
  })

  const fetchPageList = (params: any, reset?: boolean) => {
    if (reset) {
      pagination.current = 1
    }

    const { current, pageSize } = pagination
    const mergeParams = { current, pageSize, ...unref(params) }
    return fetchList(mergeParams)
  }

  if (auto) {
    fetchPageList(params)
  }

  return { fetchPageList, list, loading, pagination }
}

```

[完整文件地址](../src/hooks/utils/fetch.ts)
