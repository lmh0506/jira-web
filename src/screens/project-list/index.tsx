import { SearchPanel } from './search-panel'
import { List } from './list'
import { useEffect, useState } from 'react'
import { User } from './indexInteface'

export const ProjectListScreen = () => {
  const [param, setParam] = useState<User>({
    name: '',
    id: ''
  })
  const [list, setList] = useState([])
  useEffect(() => {
    fetch('').then(async res => {
      if(res.ok) {
        setList(await res.json())
      }
    })
  })
  
  return <div>
    <SearchPanel param={param} setParam={setParam}></SearchPanel>
    <List list={list}></List>
  </div>
}