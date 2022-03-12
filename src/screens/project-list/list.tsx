import { Dropdown, Menu, Modal, Table, TableProps } from 'antd'
import { ButtonNoPadding } from 'components/lib'
import { Pin } from 'components/pin'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { useDeleteProjects, useEditProjects } from 'utils/project'
import { User } from './search-panel'
import { useProjectModal, useProjectsQueryKey } from './utils'
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
  const {open} = useProjectModal()
  const { mutate } = useEditProjects(useProjectsQueryKey())
  const pinProject = (id: number) => (pin: boolean) => mutate({id, pin})
  const {startEdit} = useProjectModal()
  const editProject = (id: number) => () => startEdit(id)
  const { mutate: deleteProject } = useDeleteProjects(useProjectsQueryKey())
  const confirmDeleteProject = (id: number) => {
    Modal.confirm({
      title: '确定删除这个项目吗？',
      content: '点击确定删除',
      okText: '确定',
      onOk() {
        deleteProject({id})
      }
    })
  }

  return <Table pagination={false} columns={[
    {
      title: <Pin checked={true} disabled={true}></Pin>,
      render(value, project) {
        return <Pin checked={project.pin} onCheckedChange={pinProject(project.id)}></Pin>
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
            <Menu.Item onClick={editProject(project.id)} key="link">编辑</Menu.Item>  
            <Menu.Item onClick={() => confirmDeleteProject(project.id)} key="delete">删除</Menu.Item>  
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