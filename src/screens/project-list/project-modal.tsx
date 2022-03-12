import styled from "@emotion/styled"
import { Button, Drawer, Form, Input, Spin } from "antd"
import { useForm } from "antd/lib/form/Form"
import { ErrorBox } from "components/lib"
import { UserSelect } from "components/user-select"
import { useEffect } from "react"
import { useAddProjects, useEditProjects } from "utils/project"
import { useProjectModal, useProjectsQueryKey } from "./utils"

export const ProjectModal = () => {
  const {projectModalOpen, close, editingProject, isLoading} = useProjectModal()
  const title = editingProject ? '编辑项目' : '创建项目'
  
  const useMutateProject = editingProject ? useEditProjects : useAddProjects
  const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject(useProjectsQueryKey())
  const [form] = useForm()
  const onFinish = (values: any) => {
    mutateAsync({...editingProject, ...values}).then(() => {
      form.resetFields()
      close()
    })
  }

  useEffect(() => {
    form.setFieldsValue(editingProject)
  }, [editingProject, form])
  
  return <Drawer forceRender onClose={close} visible={projectModalOpen} width="100%">
    {
      isLoading ? <Spin size="large"></Spin> : <Container>
        <h1>{title}</h1>
        <ErrorBox error={error}></ErrorBox>
        <Form form={form} layout="vertical" onFinish={onFinish} style={{width: '40rem'}}>
          <Form.Item label="名称" name='name' rules={[{required: true, message: '请输入项目名'}]}>
            <Input placeholder="请输入项目名称"></Input>
          </Form.Item>
          <Form.Item label="部门" name='organization' rules={[{required: true, message: '请输入部门名'}]}>
            <Input placeholder="请输入部门名称"></Input>
          </Form.Item>
          <Form.Item label="负责人" name='personId'>
            <UserSelect defaultOptionName="负责人"></UserSelect>
          </Form.Item>
          <Form.Item>
            <Button loading={mutateLoading} htmlType="submit" type="primary">提交</Button>
          </Form.Item>
        </Form>
      </Container>
    }
  </Drawer>
}

const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
