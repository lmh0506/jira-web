import { Form, Input, Select } from "antd"
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

  return <Form layout="inline" style={{marginBottom: '2rem'}}>
    <Form.Item>
      <Input placeholder="项目名" type="text" value={param.name} onChange={e => setParam({
        ...param,
        name: e.target.value
      })} />
    </Form.Item>
    <Form.Item>
      <Select value={param.personId} onChange={value => setParam({
        ...param,
        personId: value
      })}>
        <Select.Option key="" value="">负责人</Select.Option>
        {
          users.map(item => {
            return <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
          })
        }
      </Select>
    </Form.Item>
  </Form>
}