import { useState } from "react"
export interface User {
  id: string,
  name: string,
  email: string,
  title: string,
  organization: string
}
interface SearchPanelProps {
  users: User[],
  param: {
    name: string,
    personId: string
  },
  setParam: (param: SearchPanelProps['param']) => void
}

export const SearchPanel = ({ param, users, setParam }: SearchPanelProps) => {

  return <form>
    <input type="text" value={param.name} onChange={e => setParam({
      ...param,
      name: e.target.value
    })} />
    <select value={param.personId} onChange={e => setParam({
      ...param,
      personId: e.target.value
    })}>
      {
        users.map(item => {
          return <option key={item.id} value={item.id}>{item.name}</option>
        })
      }
    </select>
  </form>
}