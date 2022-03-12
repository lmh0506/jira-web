import { useProject } from "utils/project"
import { useSetUrlSearchParam, useUrlQueryParam } from "utils/url"

export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(['name', 'personId'])
  return [
    Object.assign(param, {personId: Number(param.personId) || undefined}),
    setParam
  ] as const
}

export const useProjectsQueryKey = () => {
  const [params] = useProjectsSearchParams()
  return ['projects', params]
}

export const useProjectModal = () => {
  const [{projectCreate}, setProjectCreate] = useUrlQueryParam([
    'projectCreate'
  ])
  const [{editingProjectId}, setEditingProjectId] = useUrlQueryParam([
    'editingProjectId'
  ])
  const setUrlParams = useSetUrlSearchParam()

  const {data: editingProject, isLoading} = useProject(Number(editingProjectId))
  const startEdit = (id: number) => setEditingProjectId({editingProjectId: id})

  const open = () => setProjectCreate({projectCreate: true})
  const close = () => {
    setUrlParams({projectCreate: '', editingProjectId: ''})
  }

  return {
    projectModalOpen: projectCreate === 'true' || Boolean(editingProjectId),
    open,
    close,
    startEdit,
    editingProject,
    isLoading
  } as const
}