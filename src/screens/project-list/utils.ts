import { useUrlQueryParam } from "utils/url"

export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(['name', 'personId'])
  return [
    Object.assign(param, {personId: Number(param.personId) || undefined}),
    setParam
  ] as const
}