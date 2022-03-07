import { createContext, ReactNode, useContext, useState } from "react";
import { User } from '../screens/project-list/search-panel'
import * as auth from 'auth-provider'
import { http } from "utils/http";
import { useMount } from "utils";
import { useAsync } from "utils/use-async";
import { Spin, Typography } from "antd";
import styled from "@emotion/styled";

const AuthContext = createContext<{
  user: User | null,
  login: (form: AuthForm) => Promise<void>,
  register: (form: AuthForm) => Promise<void>,
  logout: () => Promise<void>
} | undefined>(undefined)
AuthContext.displayName = 'AuthContext'

interface AuthForm {
  username: string,
  password: string
}

const bootstrapUser = async () => {
  let user = null
  const token = auth.getToken()
  if(token) {
    const data = await http('me', {token})
    user = data.user
  }
  return user
}

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const { run, isError, error, isIdle, isLoading, data: user, setData: setUser } = useAsync<User | null>()
  const login = (form: AuthForm) => auth.login(form).then(setUser)
  const register = (form: AuthForm) => auth.register(form).then(setUser)
  const logout = () => auth.logout().then(() => setUser(null))

  useMount(() => {
    run(bootstrapUser())
  })

  if(isIdle || isLoading) {
    return <FullPageLoading></FullPageLoading>
  }

  if(isError) {
    return <FullPageErrorFallback error={error}></FullPageErrorFallback>
  }

  return <AuthContext.Provider children={children} value={{user, login, register, logout}}></AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if(!context) {
    throw new Error('useAuth必须在AuthProvider中使用')
  }
  return context
}
const FullPage = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`
export const FullPageLoading = () => <FullPage>
  <Spin size="large"></Spin>
</FullPage>

export const FullPageErrorFallback= ({error}: {error: Error | null}) => <FullPage>
  <Typography.Text type='danger'>{error?.message}</Typography.Text>
</FullPage>