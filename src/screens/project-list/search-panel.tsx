import { Form, Input, Select } from "antd"
import { useState } from "react"
export interface User {
  id: string,
  name: string,
  email: string,
  title: string,
  organization: string,
  token: string
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

  return <Form>
    <Input type="text" value={param.name} onChange={e => setParam({
      ...param,
      name: e.target.value
    })} />
    <Select value={param.personId} onChange={value => setParam({
      ...param,
      personId: value
    })}>
      {
        users.map(item => {
          return <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
        })
      }
    </Select>
  </Form>
}