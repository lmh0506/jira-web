import { useState, useCallback, useReducer } from 'react';
import { useMountedRef } from 'utils';
export interface State<T> {
  error: Error | null,
  data: T | null,
  stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = {
  stat: 'idle',
  data: null,
  error: null
}

const useSafeDiapatch = <T>(dispatch: (...arg: T[]) => void) => {
  let mountedRef = useMountedRef()
  return useCallback((...arg: T[]) => (mountedRef.current ? dispatch(...arg) : void 0), [dispatch, mountedRef])
}

export const useAsync = <T>(initialState?: State<T>) => {
  const [state, dispatch] = useReducer((state: State<T>, action: Partial<State<T>>) => ({...state, ...action}), {
    ...defaultInitialState,
    ...initialState
  })
  let safeDiapatch = useSafeDiapatch(dispatch)
  const setData = useCallback((data: T) => safeDiapatch({
    data,
    stat: 'success',
    error: null
  }), [safeDiapatch])
  const setError = useCallback((error: Error) => safeDiapatch({
    error,
    stat: 'error',
    data: null
  }), [safeDiapatch])
  const [retry, setRestry] = useState(() => () => {})

  // 用来触发异步请求
  const run = useCallback((promise: Promise<T>, runConfig?: {retry: () => Promise<T>}) => {
    if(!promise || !promise.then) {
      throw new Error('请传入 Promise 类型数据')
    }
    setRestry(() => () => {
      if(runConfig?.retry) {
        run(runConfig?.retry(), runConfig)
      }
    })
    safeDiapatch({ stat: 'loading' })
    return promise.then(data => {
      setData(data)
      return data
    }).catch(error => {
      setError(error)
      return Promise.reject(error)
    })
  }, [safeDiapatch, setData, setError])

  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    run,
    setData,
    setError,
    retry,
    setRestry,
    ...state
  }
}