import { useEffect } from 'react';
export const isFalsy = val => val === 0 ? false : !val

export const cleanObject = (obj) => {
  let res = {...obj}
  Object.keys(obj).forEach(key => {
    if(isFalsy(res[key])) {
      delete res[key]
    }
  })
  return res
}

export const useMount = (callback) => {
  useEffect(() => {
    callback && callback()
  }, [])
}