import { useMemo } from "react"
import { URLSearchParamsInit, useSearchParams } from "react-router-dom"
import { cleanObject } from "utils"

// 返回页面url中 指定参数值
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams] = useSearchParams()
  const setUrlSearchParam = useSetUrlSearchParam()
  return [
    useMemo(() => keys.reduce((prev, key) => {
      return {...prev, [key]: searchParams.get(key) || ''}
    }, {} as {[key in K]: string}),
    [searchParams]),
    (params: Partial<{[key in K]: unknown}>) => {
      return setUrlSearchParam(params)
    }
  ] as const
}

export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  return (params: {[key in string]: unknown}) => {
    const o = cleanObject({...Object.fromEntries(searchParams), ...params}) as URLSearchParamsInit
    return setSearchParams(o)
  }
}