import { useEffect } from 'react';
import { cleanObject } from 'utils';
import { Project } from './../screens/project-list/list';
import { useHttp } from './http';
import { useAsync } from './use-async';
export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp()
  const { run, ...result } = useAsync<Project[]>()
  const fetchProject = client('projects', {
    data: cleanObject(param || {})
  })

  useEffect(() => {
    run(fetchProject, {
      retry: () => fetchProject
    })
  }, [param])

  return result
}

export const useEditProjects = () => {
  const client = useHttp()
  const { run, ...result } = useAsync<Project[]>()

  const mutate = (params: Partial<Project>) => {
    return run(client(`projects/${params.id}`, {
      data: params,
      method: 'PATCH'
    }))
  }

  return {
    mutate,
    ...result
  }
}