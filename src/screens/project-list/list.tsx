import { Dropdown, Menu, Table, TableProps } from 'antd'
import { ButtonNoPadding } from 'components/lib'
import { Pin } from 'components/pin'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { useEditProjects } from 'utils/project'
import { User } from './search-panel'
export interface Project {
  id: number,
  name: string,
  personId: number,
  pin: boolean,
  organization: string,
  created: number
}

interface ListProps extends TableProps<Project> {
  users: User[],
  refresh?: () => void
}

export const List = ({ users, refresh, ...props }: ListProps) => {
  const { mutate } = useEditProjects()
  return <Table pagination={false} columns={[
    {
      title: <Pin checked={true} disabled={true}></Pin>,
      render(value, project) {
        return <Pin checked={project.pin} onCheckedChange={(pin) => {
          mutate({id: project.id, pin})
          refresh?.()
        }}></Pin>
      }
    },
    {
      title: '名称',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render(value, project) {
        return <Link to={String(project.id)}>{project.name}</Link>
      }
    }, {
      title: '部门',
      dataIndex: 'organization'
    }, {
      title: '负责人',
      render(value, project) {
        return <span>{users.find(user => user.id === project.personId)?.name || '未知'}</span>
      }
    }, {
      title: '创建时间',
      dataIndex: 'created',
      render(value, project) {
        return <span>{project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'}</span>
      }
    }, {
      render(value, project) {
        return <Dropdown overlay={<Menu>
          <Menu.Item key='edit'>
            <ButtonNoPadding type="link">编辑</ButtonNoPadding>  
          </Menu.Item>
        </Menu>}>
          <ButtonNoPadding type="link">...</ButtonNoPadding>  
        </Dropdown>
      }
    }
  ]} 
  {...props}>
  </Table>
}