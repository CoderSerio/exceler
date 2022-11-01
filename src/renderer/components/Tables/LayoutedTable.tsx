import { EditableTable } from "./EditableTable"
import { TableRouterTab } from "./TableRouterTab"

export const LayoutedTable = () => {
  return (
    <div>
      <TableRouterTab></TableRouterTab>
      <EditableTable></EditableTable>
    </div>
  )
}
