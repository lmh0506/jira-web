import { SearchPanel } from './search-panel'
// import { TestCmp } from './test'
import { List } from './list'
import { useDebounce } from '../../utils/index'
import styled from '@emotion/styled'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/user'
import { Typography } from 'antd'
import { useProjectsSearchParams } from './utils'

export const ProjectListScreen = () => {
  const [param, setParam] = useProjectsSearchParams()
  const { isLoading, error, data: list, retry } = useProjects(useDebounce(param, 200))
  const { data: users } = useUsers()
  
  return <Container>
    <h1>项目列表</h1>
    <SearchPanel users={users || []} param={param} setParam={setParam}></SearchPanel>
    { error ? <Typography.Text type='danger'>{error.message}</Typography.Text> : null}
    <List refresh={retry} loading={isLoading} users={users || []} dataSource={list || []}></List>
    {/* <TestCmp></TestCmp> */}
  </Container>
}

// ProjectListScreen.whyDidYouRender = true

const Container = styled.div`
  padding: 3.2rem;
`