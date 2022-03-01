import { useState } from "react"
import { User } from './indexInteface'

export const SearchPanel = ({ param, setParam }) => {
  const [users, setUsers] = useState<User[]>([{
    name: '负责人',
    id: ''
  }, {
    name: '222',
    id: '2'
  }])

  return <form>
    <input type="text" value={param.name} onChange={e => setParam({
      ...param,
      name: e.target.value
    })} />
    <select value={param.id} onChange={e => setParam({
      ...param,
      id: e.target.value
    })}>
      {
        users.map(item => {
          return <option value={item.id}>{item.name}</option>
        })
      }
    </select>
  </form>
}