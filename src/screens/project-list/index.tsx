import { SearchPanel, User } from './search-panel'
// import { TestCmp } from './test'
import { List, Project } from './list'
import { useEffect, useState } from 'react'
import { cleanObject, useDebounce, useMount } from '../../utils/index'
import { useHttp } from 'utils/http'
const apiUrl = process.env.REACT_APP_API_URL
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
  
  return <div>
    <SearchPanel users={users} param={param} setParam={setParam}></SearchPanel>
    <List users={users} list={list}></List>
    {/* <TestCmp></TestCmp> */}
  </div>
}