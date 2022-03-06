import { SearchPanel, User } from './search-panel'
// import { TestCmp } from './test'
import { List, Project } from './list'
import { useEffect, useState } from 'react'
import { cleanObject, useDebounce, useMount } from '../../utils/index'
import { useHttp } from 'utils/http'
import styled from '@emotion/styled'
interface QueryParam {
  name: string,
  personId: string
}

export const ProjectListScreen = () => {
  const [param, setParam] = useState<QueryParam>({
    name: '',
    personId: ''
  })
  const [users, setUsers] = useState<User[]>([])
  const [list, setList] = useState<Project[]>([])
  const debouncedParam = useDebounce(param, 200)
  const client = useHttp()

  useEffect(() => {
    client('projects', {
      data: cleanObject(debouncedParam)
    }).then(setList)
  }, [debouncedParam])
  useMount(() => {
    client('users', {
      data: cleanObject(debouncedParam)
    }).then(setUsers)
  })
  
  return <Container>
    <h1>项目列表</h1>
    <SearchPanel users={users} param={param} setParam={setParam}></SearchPanel>
    <List users={users} list={list}></List>
    {/* <TestCmp></TestCmp> */}
  </Container>
}
const Container = styled.div`
  padding: 3.2rem;
`