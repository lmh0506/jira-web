import { SearchPanel } from './search-panel'
// import { TestCmp } from './test'
import { List } from './list'
import { useDebounce } from '../../utils/index'
import styled from '@emotion/styled'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/user'
import { Button } from 'antd'
import { useProjectModal, useProjectsSearchParams } from './utils'
import { ErrorBox, Row } from 'components/lib'

export const ProjectListScreen = () => {
  const {open} = useProjectModal()
  const [param, setParam] = useProjectsSearchParams()
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 200))
  const { data: users } = useUsers()
  
  return <Container>
    <Row between>  
      <h1>项目列表</h1>
      <Button onClick={open}>创建项目</Button>
    </Row>
    <SearchPanel users={users || []} param={param} setParam={setParam}></SearchPanel>
    <ErrorBox error={error}></ErrorBox>
    <List loading={isLoading} users={users || []} dataSource={list || []}></List>
    {/* <TestCmp></TestCmp> */}
  </Container>
}

// ProjectListScreen.whyDidYouRender = true

const Container = styled.div`
  padding: 3.2rem;
`