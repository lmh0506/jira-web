import { SearchPanel, User } from './search-panel'
// import { TestCmp } from './test'
import { List, Project } from './list'
import { useEffect, useState } from 'react'
import { cleanObject, useDebounce, useMount } from '../../utils/index'
import { useHttp } from 'utils/http'
import styled from '@emotion/styled'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/user'
import { Typography } from 'antd'
interface QueryParam {
  name: string,
  personId: string
}

export const ProjectListScreen = () => {
  const [param, setParam] = useState<QueryParam>({
    name: '',
    personId: ''
  })
  const debouncedParam = useDebounce(param, 200)
  const { isLoading, error, data: list } = useProjects(debouncedParam)
  const { data: users } = useUsers()
  
  return <Container>
    <h1>项目列表</h1>
    <SearchPanel users={users || []} param={param} setParam={setParam}></SearchPanel>
    { error ? <Typography.Text type='danger'>{error.message}</Typography.Text> : null}
    <List loading={isLoading} users={users || []} dataSource={list || []}></List>
    {/* <TestCmp></TestCmp> */}
  </Container>
}
const Container = styled.div`
  padding: 3.2rem;
`