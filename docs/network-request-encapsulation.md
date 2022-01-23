# Vue3 网络封装

最近在写 Vue3 的 composition api 写法,积累了一个封装请求的方法。

## 参数分析

type IFetchOption = {
apiFn: (params: any) => Promise<any>
auto?: boolean
params?: any
format?: (res: any) => any
onSuccess?: (data: any) => void
defaultValue?: any
}

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
