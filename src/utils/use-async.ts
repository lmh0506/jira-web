import { useState } from 'react';
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

export const useAsync = <T>(initialState?: State<T>) => {
  const [state, setState] = useState<State<T>>({
    ...defaultInitialState,
    ...initialState
  })
  const setData = (data: T) => setState({
    data,
    stat: 'success',
    error: null
  })
  const setError = (error: Error) => setState({
    error,
    stat: 'error',
    data: null
  })
  const [retry, setRestry] = useState(() => () => {})
  // 用来触发异步请求
  const run = (promise: Promise<T>, runConfig?: {retry: () => Promise<T>}) => {
    if(!promise || !promise.then) {
      throw new Error('请传入 Promise 类型数据')
    }
    setRestry(() => () => {
      if(runConfig?.retry) {
        run(runConfig?.retry())
      }
    })
    setState({
      ...state,
      stat: 'loading'
    })
    return promise.then(data => {
      setData(data)
      return data
    }).catch(error => {
      setError(error)
      return Promise.reject(error)
    })
  }

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