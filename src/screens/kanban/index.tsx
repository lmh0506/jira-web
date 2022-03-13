import styled from "@emotion/styled"
import { useKanbans } from "utils/kanban"
import { KanbanColumn } from "./kanban-column"
import { useKanbanSearchParams, useProjectInUrl } from "./utils"

export const KanbanScreen = () => {
  const { data: currentProject } = useProjectInUrl()
  const { data: kanbans } = useKanbans(useKanbanSearchParams())
  return <div>
    <h1>{currentProject?.name}看板</h1>
    <ColumnContainer>
      {
        kanbans?.map(kanban => <KanbanColumn kanban={kanban} key={kanban.id}></KanbanColumn>)
      }
    </ColumnContainer>
  </div>
}
const ColumnContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-right: 2rem;
`