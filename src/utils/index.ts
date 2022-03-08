import { useEffect, useState } from 'react';
export const isFalsy = (val: unknown) => val === 0 ? false : !val
export const isVoid = (val: unknown) => val === undefined || val === null || val === ''

export const cleanObject = <T extends object>(obj: T) => {
  let res = {...obj}
  // Object.keys(res).forEach((key) => {
  //   if(isVoid(res[key])) {
  //     delete res[key]
  //   }
  // })
  for(let key in res) {
    if(isVoid(res[key])) {
      delete res[key]
    }
  }
  return res
}

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback && callback()
  }, [])
}

export const useDebounce = <T>(val: T, delay?: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(val)
  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(val), delay)
    // 每次在上一个useEffect处理以后再执行
    return () => clearTimeout(timeout)
  }, [val, delay])
  return debouncedValue
}

export const useArray = <T>(value: T[]) => {
  const [data, setData] = useState<T[]>(value)
  const clear = () => {
    setData([])
  }
  const removeIndex = (index: number) => {
    let d = [...data]
    d.splice(index, 1)
    setData(d)
  }
  const add = (item: T) => {
    setData([item, ...data])
  }
  return {
    value: data,
    clear,
    removeIndex,
    add
  }
}

export const resetRoute = () => window.location.href = window.location.origin