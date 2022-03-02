import { SearchPanel, User } from './search-panel'
import { TestCmp } from './test'
import { List, Project } from './list'
import { useEffect, useState } from 'react'
import { cleanObject, useDebounce, useMount } from '../../utils/index'
import qs from 'qs'
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

  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(async res => {
      if(res.ok) {
        setList(await res.json())
      }
    })
  }, [debouncedParam])
  useMount(() => {
    fetch(`${apiUrl}/users`).then(async res => {
      if(res.ok) {
        setUsers(await res.json())
      }
    })
  })
  
  return <div>
    <SearchPanel users={users} param={param} setParam={setParam}></SearchPanel>
    <List users={users} list={list}></List>
    <TestCmp></TestCmp>
  </div>
}