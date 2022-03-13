import { QueryKey } from 'react-query';
import { useEditConfig, useAddConfig, useDeleteConfig } from './use-optimistic-options';
import { useHttp } from './http';
import { useQuery, useMutation } from 'react-query'
import { Project } from 'types/project';
export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp()

  return useQuery<Project[], Error>(['project', param], () => client('projects', {data: param}))
}

export const useEditProjects = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation((params: Partial<Project>) => client(`projects/${params.id}`, {
    data: params,
    method: 'PATCH'
  }),
  useEditConfig(queryKey))
}

export const useAddProjects = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation((params: Partial<Project>) => client(`projects`, {
    data: params,
    method: 'POST'
  }), 
  useAddConfig(queryKey))
}

export const useDeleteProjects = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(({id}: {id: number}) => client(`projects/${id}`, {
    method: 'DELETE'
  }), 
  useDeleteConfig(queryKey))
}

export const useProject = (id?: number) => {
  const client = useHttp()
  return useQuery<Project>(
    ['project', {id}],
    () => client(`projects/${id}`), {
      enabled: Boolean(id)
    }
  )
}