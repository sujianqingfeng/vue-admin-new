export const successResponse = (data: any, code = 200) => {
  return {
    code,
    data
  }
}

export const failResponse = (msg = '错误信息', code = 400) => {
  return {
    code,
    msg
  }
}
