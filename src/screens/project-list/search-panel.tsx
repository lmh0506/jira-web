import { Form, Input } from "antd"
import { UserSelect } from "components/user-select"
import { Project } from "./list"
export interface User {
  id: number,
  name: string,
  email: string,
  title: string,
  organization: string,
  token: string
}
interface SearchPanelProps {
  users: User[],
  param: Partial<Pick<Project, 'name' | 'personId'>>,
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
      <UserSelect 
        defaultOptionName="负责人"
        value={param.personId} 
        onChange={value => setParam({
          ...param,
          personId: value
        })}></UserSelect>
    </Form.Item>
  </Form>
}