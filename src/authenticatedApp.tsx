import styled from '@emotion/styled'
import { ButtonNoPadding, Row } from 'components/lib'
import { useAuth } from 'context/auth-context'
import { ProjectListScreen } from 'screens/project-list'
import { ReactComponent as SoftwareLogo} from 'assets/software-logo.svg'
import { Button, Dropdown, Menu } from 'antd'
import { Route, Navigate, Routes } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import { ProjectScreen } from 'screens/project'
import { resetRoute } from 'utils'
import { ProjectModal } from 'screens/project-list/project-modal'
import { ProjectPopover } from 'components/project-popover'
export const AuthenticatedApp = () => {
  return <Container>
    <Router>
      <PageHeader></PageHeader>
      <Main>
        <Routes>
          <Route path='/projects' element={<ProjectListScreen />}></Route>
          <Route path='/projects/:projectId/*' element={<ProjectScreen />}></Route>
        </Routes>
        {/* <Navigate to={'/projects'}></Navigate> */}
        <ProjectModal></ProjectModal>
      </Main>
    </Router>
  </Container>
}

const PageHeader = () => {
  const { logout, user } = useAuth()
  return <Header between>
    <HeaderLeft gap>
      <ButtonNoPadding type='link' onClick={resetRoute}>
        <SoftwareLogo width="11rem" color="rgb(38, 132, 255)"></SoftwareLogo>
      </ButtonNoPadding>
      <ProjectPopover></ProjectPopover>
      <span>用户</span>
    </HeaderLeft>
    <HeaderRight>
      <Dropdown overlay={
        <Menu>
          <Menu.Item> 
            <Button type="link" onClick={logout}>退出登录</Button>
          </Menu.Item>
        </Menu>
      }>
        <Button type="link" onClick={e => e.preventDefault()}>
          Hi, {user?.name}  
        </Button>
        
      </Dropdown>
    </HeaderRight>
  </Header>
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  height: 100vh;
`
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, .1);
  z-index: 1;
`
const HeaderLeft = styled(Row)`
`
const HeaderRight = styled.div`
`

const Main = styled.main`
  height: calc(100vh - 6rem);
`