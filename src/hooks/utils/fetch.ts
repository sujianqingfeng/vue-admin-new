import { reactive, ref, unref } from 'vue'

type IFetchOption = {
  apiFn: (params: any) => Promise<any>
  auto?: boolean
  params?: any
  format?: (res: any) => any
  onSuccess?: (data: any) => void
  defaultValue?: any
}

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

export const useFetchList = (option: IFetchOption) => {
  const { fetchApi: fetchList, loading, result: list } = useFetch({ ...option, defaultValue: [] })
  return { fetchList, loading, list }
}

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
